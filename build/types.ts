import type { VNode } from "@/jsx/types";

export interface ContentModule {
  default: () => VNode;
  meta?: PageMeta;
}

export interface PageMeta {
  title: string;
  description: string;
  email: string;
  linkedin: string;
  github: string;
  website: string;
  image: string;
  keywords?: string;
  summary?: string;
  tags?: string[];
  og: {
    title: string;
    description: string;
    locale: string;
    image: string;
    url: string;
  };
  twitter: {
    card: string;
    site: string;
    title: string;
    description: string;
    image: string;
  };
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
