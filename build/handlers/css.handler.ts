import fs from "fs/promises";
import path from "path";
import { BaseHandler } from "./base.handler";
import { BuildConfig, HTMLResource, ProcessResult } from "../types";
import { parseCSS, updateCSSPaths } from "../parsers/css.parser";
import { cssProcessor } from "../utils/postcssRuntime";

export class CSSHandler extends BaseHandler {
  canHandle(resource: HTMLResource | string): boolean {
    if (typeof resource === "string") {
      return resource.endsWith(".css");
    }
    return resource.type === "stylesheet";
  }

  async process(
    sourcePath: string,
    config: BuildConfig,
    metadata?: Record<string, string>,
  ): Promise<ProcessResult> {
    const fullPath = path.join(config.publicDir, sourcePath);
    const css = await fs.readFile(fullPath, "utf-8");

    const media = metadata?.media;
    const shouldInline = !media || media === "screen" || media === "all";

    const result = await cssProcessor.process(css, {
      from: fullPath,
    });

    const cssResources = parseCSS(result.css);
    const dependencies = cssResources
      .filter((dep) => !dep.isExternal && dep.type === "url")
      .map((dep) => {
        const cssDir = path.dirname(sourcePath);
        return path.normalize(path.join(cssDir, dep.path));
      });

    if (shouldInline) {
      const cssDir = path.dirname(sourcePath);
      const updatedCSS = updateCSSPaths(result.css, cssDir, "");

      return {
        content: updatedCSS,
        dependencies,
      };
    } else {
      const outputPath = path.join(config.outDir, sourcePath);

      return {
        outputPath,
        dependencies,
      };
    }
  }
}
