export interface FrontMatterResult {
  body: string;
  [key: string]: string | boolean | number | string[];
}

export interface BuildConfig {
  contentDir: string;
  publicDir: string;
  outDir: string;
  templateFile: string;
  alwaysCopy?: string[];
}

export interface HTMLResource {
  type: "stylesheet" | "image" | "icon" | "manifest" | "script";
  href: string;
  attributes: Record<string, string>;
  tag: string;
}

export interface CSSResource {
  type: "url" | "import";
  path: string;
  isExternal: boolean;
}

export interface ProcessResult {
  content?: string;
  outputPath?: string;
  dependencies: string[];
}

export interface AssetHandler {
  canHandle(resource: HTMLResource | string): boolean;
  process(
    sourcePath: string,
    config: BuildConfig,
    metadata?: Record<string, string>,
  ): Promise<ProcessResult>;
}

export interface ProcessedAssets {
  inlinedCSS: string[];
  copiedFiles: Array<{ src: string; dest: string }>;
  updatedHTML: string;
}
