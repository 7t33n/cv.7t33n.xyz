import { FrontMatterResult } from "../types";

export function parseFrontMatter(md: string): FrontMatterResult {
  const fmMatch = md.match(/^---\s*([\s\S]*?)\s*---\s*\n?/);
  if (!fmMatch) return { body: md };

  const fm = fmMatch[1];
  const body = md.slice(fmMatch[0].length);
  const frontMatter: Record<string, any> = {};

  const lines = fm.split('\n').filter(line => line.trim());

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    value = value.replace(/^["']|["']$/g, "");

    if (value === 'true' || value === 'false') {
      frontMatter[key] = value === 'true';
    } else if (!isNaN(Number(value)) && value !== '') {
      frontMatter[key] = Number(value);
    } else if (value.startsWith('[') && value.endsWith(']')) {
      try {
        const arrayContent = value.slice(1, -1);
        frontMatter[key] = arrayContent
          .split(',')
          .map(item => item.trim().replace(/^["']|["']$/g, ""));
      } catch {
        frontMatter[key] = value;
      }
    } else {
      frontMatter[key] = value;
    }
  }

  return { body, ...frontMatter };
}

