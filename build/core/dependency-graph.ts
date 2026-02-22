import { AssetHandler, BuildConfig, ProcessResult } from "../types";

export class DependencyGraph {
  private processed = new Set<string>();
  private resources = new Map<string, ProcessResult>();
  private handlers: AssetHandler[];

  constructor(handlers: AssetHandler[]) {
    this.handlers = handlers;
  }

  async addResource(
    resourcePath: string,
    config: BuildConfig,
    metadata?: Record<string, string>,
  ): Promise<void> {
    if (this.processed.has(resourcePath)) {
      return;
    }

    this.processed.add(resourcePath);

    const handler = this.handlers.find((h) => h.canHandle(resourcePath));

    if (!handler) {
      console.warn(`No handler found for resource: ${resourcePath}`);
      return;
    }

    try {
      const result = await handler.process(resourcePath, config, metadata);
      this.resources.set(resourcePath, result);

      if (result.dependencies && result.dependencies.length > 0) {
        await Promise.all(
          result.dependencies.map((dep) => this.addResource(dep, config)),
        );
      }
    } catch (error) {
      console.error(`Error processing resource ${resourcePath}:`, error);
    }
  }

  getInlinedCSS(): string[] {
    const inlined: string[] = [];

    for (const [_path, result] of this.resources.entries()) {
      if (result.content) {
        inlined.push(result.content);
      }
    }

    return inlined;
  }

  getCopiedResources(): Array<{ src: string; dest: string }> {
    const copied: Array<{ src: string; dest: string }> = [];

    for (const [srcPath, result] of this.resources.entries()) {
      if (result.outputPath) {
        copied.push({
          src: srcPath,
          dest: result.outputPath,
        });
      }
    }

    return copied;
  }

  isProcessed(resourcePath: string): boolean {
    return this.processed.has(resourcePath);
  }

  getResult(resourcePath: string): ProcessResult | undefined {
    return this.resources.get(resourcePath);
  }
}
