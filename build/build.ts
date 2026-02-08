import fs from "fs/promises";
import { Buffer } from "node:buffer";
import path from "path";
import MarkdownIt from "markdown-it";
import { minify } from "@minify-html/node";
import { BuildConfig } from "./types";
import { parseFrontMatter } from "./utils/frontMatter.utils";
import { fileExists, findFiles, copyPublicAssets } from "./utils/fs.utils";
import { loadTemplate } from "./utils/template.utils";

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
): Promise<void> {
  console.log("Processing markdown files...");
  const templatePath = path.join(config.publicDir, config.templateFile);

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

        const html = await loadTemplate(templatePath, templateVars);

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

async function build() {
  const root = process.cwd();
  const config: BuildConfig = {
    contentDir: path.join(root, "content"),
    publicDir: path.join(root, "public"),
    outDir: path.join(root, "dist"),
    templateFile: "index.html",
    cssDir: "css",
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

    await copyPublicAssets(config);
    await processMarkdownFiles(config, mdFiles, md);

    console.log("Build completed successfully!");
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
}

build();
