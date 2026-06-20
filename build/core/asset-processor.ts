import { BuildConfig, ProcessedAssets } from "@/types";
import {
  parseHTML,
  isExternalPath,
  isTemplateVariable,
  normalizePath,
} from "@/parsers/html.parser";
import { DependencyGraph } from "./dependency-graph";
import { CSSHandler, StaticHandler, SVGHandler } from "@/handlers";

export async function processAssets(
  templateContent: string,
  config: BuildConfig,
): Promise<ProcessedAssets> {
  const resources = parseHTML(templateContent);

  const handlers = [new CSSHandler(), new SVGHandler(), new StaticHandler()];
  const graph = new DependencyGraph(handlers);

  for (const resource of resources) {
    if (isExternalPath(resource.href) || isTemplateVariable(resource.href)) {
      continue;
    }

    const resourcePath = normalizePath(resource.href);

    await graph.addResource(resourcePath, config, resource.attributes);
  }

  if (config.alwaysCopy) {
    for (const file of config.alwaysCopy) {
      await graph.addResource(file, config);
    }
  }

  const inlinedCSS = graph.getInlinedCSS();
  const copiedFiles = graph.getCopiedResources();

  let updatedHTML = templateContent;

  for (const resource of resources) {
    if (resource.type === "stylesheet" && !isExternalPath(resource.href) && !isTemplateVariable(resource.href)) {
      const resourcePath = normalizePath(resource.href);
      const result = graph.getResult(resourcePath);

      if (result?.content) {
        const styleTag = `<style>\n${result.content}\n  </style>`;
        updatedHTML = updatedHTML.replace(resource.tag, styleTag);
      }
    }

    if (resource.type === "image" && resource.href.endsWith(".svg") && !isExternalPath(resource.href) && !isTemplateVariable(resource.href)) {
      const resourcePath = normalizePath(resource.href);
      const result = graph.getResult(resourcePath);

      if (result?.content) {
        const encoded = encodeURIComponent(result.content);
        updatedHTML = updatedHTML.replace(
          `src="${resource.href}"`,
          `src="data:image/svg+xml;utf8,${encoded}"`,
        );
      }
    }
  }

  return {
    inlinedCSS,
    copiedFiles,
    updatedHTML,
  };
}
