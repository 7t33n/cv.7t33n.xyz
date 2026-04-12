import path from "path";
import { AssetHandler, BuildConfig, ProcessResult } from "../types";

export class DependencyGraph {
  private processed = new Set<string>();
  private resources = new Map<string, ProcessResult>();
  private handlers: AssetHandler[];
  private reverseDependencies = new Map<string, string[]>();

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

      if (result.content && result.dependencies.length > 0) {
        for (const dep of result.dependencies) {
          const normalizedDep = path.normalize(dep);
          if (!this.reverseDependencies.has(normalizedDep)) {
            this.reverseDependencies.set(normalizedDep, []);
          }
          this.reverseDependencies.get(normalizedDep)!.push(resourcePath);
        }
      }

      this.resources.set(resourcePath, result);

      const isSVG = resourcePath.endsWith(".svg");
      if (result.dependencies && result.dependencies.length > 0) {
        await Promise.all(
          result.dependencies.map((dep) => this.addResource(dep, config)),
        );
      }

      if (isSVG && result.content) {
        const base64 = Buffer.from(result.content).toString("base64");
        const dependents = this.reverseDependencies.get(resourcePath) || [];
        for (const cssPath of dependents) {
          const cssResult = this.resources.get(cssPath);
          if (cssResult?.content) {
            const escapedPath = resourcePath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            const urlRegex = new RegExp(`url\\(["']?${escapedPath}["']?\\)`, "g");
            cssResult.content = cssResult.content.replace(
              urlRegex,
              `url("data:image/svg+xml;base64,${base64}")`,
            );
          }
        }
      }
    } catch (error) {
      console.error(`Error processing resource ${resourcePath}:`, error);
    }
  }

  getInlinedCSS(): string[] {
    const inlined: string[] = [];

    for (const result of this.resources.values()) {
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