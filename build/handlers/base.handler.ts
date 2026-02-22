import { AssetHandler, HTMLResource, ProcessResult } from "../types";

export abstract class BaseHandler implements AssetHandler {
  abstract canHandle(resource: HTMLResource | string): boolean;

  abstract process(
    sourcePath: string,
    config: import("../types").BuildConfig,
    metadata?: Record<string, string>,
  ): Promise<ProcessResult>;
}
