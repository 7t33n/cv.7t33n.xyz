import fs from "fs/promises";
import path from "path";
import { optimize } from "svgo";
import { BaseHandler } from "./base.handler";
import { BuildConfig, HTMLResource, ProcessResult } from "../types";

export class SVGHandler extends BaseHandler {
  canHandle(resource: HTMLResource | string): boolean {
    if (typeof resource === "string") {
      return resource.endsWith(".svg");
    }
    return resource.type === "image" && resource.href.endsWith(".svg");
  }

  async process(
    sourcePath: string,
    config: BuildConfig,
  ): Promise<ProcessResult> {
    const fullPath = path.join(config.publicDir, sourcePath);
    const svg = await fs.readFile(fullPath, "utf-8");

    const result = optimize(svg, {
      multipass: true,
      plugins: [
        {
          name: "preset-default",
        },
      ],
    });

    return {
      content: result.data,
      dependencies: [],
    };
  }
}
