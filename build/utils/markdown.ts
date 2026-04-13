import MarkdownIt from "markdown-it";
import container from "markdown-it-container";

export function createMarkdownIt(): MarkdownIt {
  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true,
  });

  md.use(container, "spoiler", {
    validate: (params: string) => params.trim().match(/^spoiler\s*(.*)$/),
    render: (tokens: MarkdownIt.Token[], idx: number) => {
      const m = tokens[idx].info.trim().match(/^spoiler\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        const title = m && m[1] ? m[1] : "";
        return `<details><summary>${md.utils.escapeHtml(title)}</summary>\n`;
      }
      return "</details>\n";
    },
  });

  return md;
}