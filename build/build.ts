import fs from "fs/promises";
import path from "path";
import MarkdownIt from "markdown-it";
import { BuildConfig } from "./types";
import { parseFrontMatter } from "./utils/frontMatter.utils";
import { fileExists, copyDirectory, findFiles } from "./utils/fs.utils";
import { escapeHtml } from "./utils/format.utils";

async function loadTemplate(templatePath: string, variables: Record<string, string>): Promise<string> {
  let template = await fs.readFile(templatePath, "utf8");

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    template = template.replaceAll(placeholder, value);
  }

  return template;
}

async function validateConfig(config: BuildConfig): Promise<void> {
  const errors: string[] = [];

  if (!(await fileExists(config.contentDir))) {
    errors.push(`Content directory not found: ${config.contentDir}`);
  }

  if (!(await fileExists(config.publicDir))) {
    errors.push(`Public directory not found: ${config.publicDir}`)
  }

  const templatePath = path.join(config.publicDir, config.templateFile);
  if (!(await fileExists(templatePath))) {
    errors.push(`Template file not found: ${templatePath}`);
  }

  if (errors.length > 0) {
    throw new Error(`Configuration validation failed: \n${errors.join('\n')}`);
  }
}

async function build() {
  const root = process.cwd();

  const config: BuildConfig = {
    contentDir: path.join(root, "content"),
    publicDir: path.join(root, "public"),
    outDir: path.join(root, "dist"),
    templateFile: "index.html",
    cssDir: "css",
  }

  console.log("Validating Configuration...");
  await validateConfig(config);

  const templatePath = path.join(config.publicDir, config.templateFile);

  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true
  });

  console.log("Finding markdown files...");
  const mdFiles = await findFiles(config.contentDir, '.md');

  if (mdFiles.length === 0) {
    console.warn("No markdown files found in content directory");
    return;
  }

  console.log(`Found ${mdFiles.length} markdown files`);

  console.log("Preparing output directory...");
  await fs.rm(config.outDir, { recursive: true, force: true })
  await fs.mkdir(config.outDir, { recursive: true });

  console.log("Copying public assets...");
  const publicEntries = await fs.readdir(config.publicDir, { withFileTypes: true });

  for (const entry of publicEntries) {
    if (entry.name === config.templateFile) continue;

    const srcPath = path.join(config.publicDir, entry.name);
    const destPath = path.join(config.outDir, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
      console.log(`Copied directory: ${entry.name}`);
    } else {
      await fs.copyFile(srcPath, destPath);
      console.log(`Copied file: ${entry.name}`);
    }
  }

  console.log("Processing markdown files...");
  for (const filePath of mdFiles) {
    try {
      const mdRaw = await fs.readFile(filePath, "utf8");
      const { body, ...params } = parseFrontMatter(mdRaw);

      const contentHtml = md.render(body);

      const templateVars: Record<string, string> = {
        content: contentHtml,
        ...Object
          .fromEntries(
            Object
              .entries(params)
              .map(([key, value]) => [
                key,
                key === 'title' ? escapeHtml(String(value || "")) : String(value)
              ])
          )
      }

      const html = await loadTemplate(templatePath, templateVars);

      const relativePath = path.relative(config.contentDir, filePath);
      const base = path.basename(relativePath, ".md");
      const dir = path.dirname(relativePath);

      const outName = base === "index" ? "index.html" : `${base}.html`;
      const outPath = dir === "."
        ? path.join(config.outDir, outName)
        : path.join(config.outDir, dir, outName);

      await fs.mkdir(path.dirname(outPath), { recursive: true, });
      await fs.writeFile(outPath, html, "utf8");
      console.log(`Built: ${path.relative(root, outPath)}`);
    } catch (error) {
      console.error(`Error processing ${filePath}: ${error}`);
    }
  }

  console.log("Buiild completed successfully!");
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
