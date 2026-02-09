import { FrontMatterResult } from "../types";
import { load as loadYaml } from "js-yaml";

export async function parseFrontMatter(md: string): Promise<FrontMatterResult> {
  const fmMatch = md.match(/^---\s*([\s\S]*?)\s*---\s*\n?/);

  if (!fmMatch) {
    return { body: md };
  }

  const fm = fmMatch[1];
  const body = md.slice(fmMatch[0].length);

  try {
    const frontMatter = (await loadYaml(fm)) as Record<string, unknown> | null;

    if (typeof frontMatter === "object" && frontMatter !== null) {
      return { body, ...frontMatter };
    }
    return { body };
  } catch (error) {
    console.error("Error parsing front matter:", error);
    return { body };
  }
}
