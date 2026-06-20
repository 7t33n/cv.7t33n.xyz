import fs from "fs/promises";
import { Buffer } from "node:buffer";
import path from "path";
import { minify } from "@minify-html/node";
import { BuildConfig, ContentModule } from "@/types";
import { jsx } from "@/jsx/jsx-runtime";
import { renderToString } from "@/jsx/render";
import { fileExists, findFiles } from "@/utils/fs.utils";
import { loadTemplate } from "@/utils/template.utils";
import { processAssets } from "@/core/asset-processor";
import { compressHtmlOutputs } from "@/core/compression";

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

async function processContentFiles(
  config: BuildConfig,
  contentFiles: string[],
  template: string,
): Promise<Array<{ src: string; dest: string }>> {
  console.log("Processing content files...");

  const copiedFiles = await Promise.all(
    contentFiles.map(async (filePath) => {
      try {
        const mod = (await import(filePath)) as ContentModule;
        const Page = mod.default;

        if (typeof Page !== "function") {
          throw new Error(`No default-exported component in ${filePath}`);
        }

        const contentHtml = renderToString(jsx(Page, {}));

        const templateVars = {
          content: contentHtml,
          ...(mod.meta ?? {}),
        };

        const composedHtml = await loadTemplate(template, templateVars, true);

        const { updatedHTML, copiedFiles } = await processAssets(
          composedHtml,
          config,
        );

        const relativePath = path.relative(config.contentDir, filePath);
        const { dir, name } = path.parse(relativePath);
        const outName = `${name}.html`;
        const outDir =
          dir === "" ? config.outDir : path.join(config.outDir, dir);
        const outPath = path.join(outDir, outName);

        await fs.mkdir(outDir, { recursive: true });
        await fs.writeFile(outPath, minify(Buffer.from(updatedHTML), {}), "utf8");
        console.log(`Built: ${path.relative(process.cwd(), outPath)}`);

        return copiedFiles;
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
        return [];
      }
    }),
  );

  const deduped = new Map<string, { src: string; dest: string }>();
  for (const file of copiedFiles.flat()) {
    deduped.set(file.dest, file);
  }

  return [...deduped.values()];
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

    console.log("Finding content files...");
    const contentFiles = await findFiles(config.contentDir, ".tsx");

    if (contentFiles.length === 0) {
      console.warn("No content files found in content directory");
      return;
    }

    console.log(`Found ${contentFiles.length} content files`);

    const templatePath = path.join(config.publicDir, config.templateFile);
    const template = await fs.readFile(templatePath, "utf-8");

    const copiedFiles = await processContentFiles(
      config,
      contentFiles,
      template,
    );

    console.log(`Found ${copiedFiles.length} files to copy`);

    await copyFiles(copiedFiles, config);

    await compressHtmlOutputs(config.outDir);

    console.log("Build completed successfully!");
  } catch (err) {
    console.error("Build failed:", err);
    process.exit(1);
  }
}

void build();
