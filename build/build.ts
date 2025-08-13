import fs from "fs/promises";
import path from "path";
import MarkdownIt from "markdown-it";

function parseFrontMatter(md: string): { body: string; title?: string } {
  const fmMatch = md.match(/^---\s*([\s\S]*?)\s*---\s*\n?/);
  if (!fmMatch) return { body: md };
  const fm = fmMatch[1];
  const body = md.slice(fmMatch[0].length);
  const titleMatch = fm.match(/^\s*title\s*:\s*(.+)\s*$/m);
  const title = titleMatch ? titleMatch[1].trim().replace(/^["']|["']$/g, "") : undefined;
  return { body, title };
}

async function loadTemplate(templatePath: string, variables: Record<string, string>): Promise<string> {
  let template = await fs.readFile(templatePath, "utf8");

  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    template = template.replaceAll(placeholder, value);
  }

  return template;
}

function escapeHtml(s: string) {
  return s.replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;");
}

async function build() {
  const root = process.cwd();
  const contentDir = path.join(root, "content");
  const templatePath = path.join(root, "public", "index.html");
  const cssSourcePath = path.join(root, "public", "css", "style.css");
  const outDir = path.join(root, "dist");
  const cssOutPath = path.join(outDir, "css", "style.css");

  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true
  });
  
  const entries = await fs.readdir(contentDir, { withFileTypes: true });
  const mdFiles = entries.filter((e) => e.isFile() && e.name.endsWith('.md'));

  await fs.rm(outDir, { recursive: true, force: true });

  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(path.join(outDir, "css"), { recursive: true });
  await fs.copyFile(cssSourcePath, cssOutPath);

  for (const file of mdFiles) {
    const inputPath = path.join(contentDir, file.name);
    const mdRaw = await fs.readFile(inputPath, "utf8");
    const { body, title } = parseFrontMatter(mdRaw);

    const contentHtml = md.render(body);
    const html = await loadTemplate(templatePath, {
      title: escapeHtml(title || ""),
      content: contentHtml,
    });

    const base = path.basename(file.name, ".md");
    const outName = base === "index" ? "index.html" : `${base}.html`;
    const outPath = path.join(outDir, outName);

    await fs.writeFile(outPath, html, "utf8");
    console.log(`Built ${path.relative(root, outPath)}`);
  }

  console.log(`Copied ${path.relative(root, cssOutPath)}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
