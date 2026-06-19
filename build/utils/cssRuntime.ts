import { transform } from "lightningcss";

export function processCSS(css: string, filename: string): string {
  const { code } = transform({
    filename,
    code: Buffer.from(css),
    minify: true,
  });

  return code.toString();
}
