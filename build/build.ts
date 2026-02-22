import fs from "fs/promises";
import { Buffer } from "node:buffer";
import path from "path";
import MarkdownIt from "markdown-it";
import { minify } from "@minify-html/node";
import { BuildConfig } from "./types";
import { parseFrontMatter } from "./utils/frontMatter.utils";
import { fileExists, findFiles } from "./utils/fs.utils";
import { loadTemplate } from "./utils/template.utils";
import { processAssets } from "./core/asset-processor";

async function validateConfig(config: BuildConfig): Promise<void> {
  const errors: string[] = [];

  const checks = [
    {
      path: config.contentDir,
      message: `Content directory not found: ${config.contentDir}`,
    },
    {
      path: config.publicDir,
      message: `Public directory not found: ${config.publicDir}`,
    },
    {
      path: path.join(config.publicDir, config.templateFile),
      message: `Template file not found: ${path.join(config.publicDir, config.templateFile)}`,
    },
  ];

  const results = await Promise.all(
    checks.map(async (check) => {
      const exists = await fileExists(check.path);
      return { exists, message: check.message };
    }),
  );

  results.forEach((result) => {
    if (!result.exists) {
      errors.push(result.message);
    }
  });

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed: \n${errors.join("\n")}`);
  }
}

async function processMarkdownFiles(
  config: BuildConfig,
  mdFiles: string[],
  md: MarkdownIt,
  processedTemplate: string,
): Promise<void> {
  console.log("Processing markdown files...");

  await Promise.all(
    mdFiles.map(async (filePath) => {
      try {
        const mdRaw = await fs.readFile(filePath, "utf8");
        const { body, ...params } = await parseFrontMatter(mdRaw);
        const contentHtml = md.render(body);

        const templateVars = {
          content: contentHtml,
          ...params,
        };

        const html = await loadTemplate(processedTemplate, templateVars, true);

        const relativePath = path.relative(config.contentDir, filePath);
        const { dir, name } = path.parse(relativePath);
        const outName = `${name}.html`;
        const outDir =
          dir === "" ? config.outDir : path.join(config.outDir, dir);
        const outPath = path.join(outDir, outName);

        await fs.mkdir(outDir, { recursive: true });
        await fs.writeFile(outPath, minify(Buffer.from(html), {}), "utf8");
        console.log(`Built: ${path.relative(process.cwd(), outPath)}`);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    }),
  );
}

async function copyFiles(
  copiedFiles: Array<{ src: string; dest: string }>,
  config: BuildConfig,
): Promise<void> {
  console.log("Copying processed files...");

  await Promise.all(
    copiedFiles.map(async ({ src, dest }) => {
      try {
        const sourcePath = path.join(config.publicDir, src);
        await fs.mkdir(path.dirname(dest), { recursive: true });
        await fs.copyFile(sourcePath, dest);
        console.log(`Copied: ${path.relative(process.cwd(), dest)}`);
      } catch (error) {
        console.error(`Error copying ${src}:`, error);
      }
    }),
  );
}

async function build() {
  const root = process.cwd();
  const config: BuildConfig = {
    contentDir: path.join(root, "content"),
    publicDir: path.join(root, "public"),
    outDir: path.join(root, "dist"),
    templateFile: "index.html",
    alwaysCopy: ["robots.txt", "sitemap.xml", "site.webmanifest"],
  };

  try {
    console.log("Validating Configuration...");
    await validateConfig(config);

    console.log("Preparing output directory...");
    await fs.rm(config.outDir, { recursive: true, force: true });
    await fs.mkdir(config.outDir, { recursive: true });

    const md = new MarkdownIt({
      html: false,
      linkify: true,
      typographer: true,
    });

    console.log("Finding markdown files...");
    const mdFiles = await findFiles(config.contentDir, ".md");

    if (mdFiles.length === 0) {
      console.warn("No markdown files found in content directory");
      return;
    }

    console.log(`Found ${mdFiles.length} markdown files`);

    console.log("Processing assets...");
    const templatePath = path.join(config.publicDir, config.templateFile);
    const { copiedFiles, updatedHTML } = await processAssets(
      templatePath,
      config,
    );

    console.log(`Inlined CSS into template`);
    console.log(`Found ${copiedFiles.length} files to copy`);

    await copyFiles(copiedFiles, config);

    await processMarkdownFiles(config, mdFiles, md, updatedHTML);

    console.log("Build completed successfully!");
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
}

build();
