import path from "path";
import { BaseHandler } from "./base.handler";
import { BuildConfig, HTMLResource, ProcessResult } from "../types";

export class StaticHandler extends BaseHandler {
  canHandle(resource: HTMLResource | string): boolean {
    if (typeof resource === "string") {
      const ext = path.extname(resource).toLowerCase();
      return [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".svg",
        ".webp",
        ".ico",
        ".woff",
        ".woff2",
        ".ttf",
        ".eot",
        ".json",
        ".xml",
        ".txt",
        ".webmanifest",
      ].includes(ext);
    }

    return ["image", "icon", "manifest"].includes(resource.type);
  }

  async process(
    sourcePath: string,
    config: BuildConfig,
    _metadata?: Record<string, string>,
  ): Promise<ProcessResult> {
    const outputPath = path.join(config.outDir, sourcePath);

    return {
      outputPath,
      dependencies: [],
    };
  }
}
