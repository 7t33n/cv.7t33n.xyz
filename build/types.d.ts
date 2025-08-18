export interface FrontMatterResult {
  body: string;
  [key: string]: string | boolean | number | string[];
}

export interface BuildConfig {
  contentDir: string;
  publicDir: string;
  outDir: string;
  templateFile: string;
  cssDir: string;
}
