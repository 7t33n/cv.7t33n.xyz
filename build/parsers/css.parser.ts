import { CSSResource } from "../types";

export function parseCSS(css: string): CSSResource[] {
  const resources: CSSResource[] = [];

  const urlRegex = /url\(["']?([^"')]+)["']?\)/gi;
  let match;

  while ((match = urlRegex.exec(css)) !== null) {
    const path = match[1];
    const isExternal = /^https?:\/\//i.test(path);

    resources.push({
      type: "url",
      path,
      isExternal,
    });
  }

  const importRegex = /@import\s+(?:url\()?["']?([^"')]+)["']?\)?/gi;

  while ((match = importRegex.exec(css)) !== null) {
    const path = match[1];
    const isExternal = /^https?:\/\//i.test(path);

    resources.push({
      type: "import",
      path,
      isExternal,
    });
  }

  return resources;
}

export function updateCSSPaths(
  css: string,
  fromDir: string,
  toDir: string,
): string {
  return css.replace(/url\(["']?([^"')]+)["']?\)/gi, (match, path) => {
    if (/^(https?:\/\/|data:)/i.test(path)) {
      return match;
    }

    if (path.startsWith("/")) {
      return match;
    }

    const segments = path.split("/");
    const fromSegments = fromDir.split("/").filter((s) => s);
    let upCount = 0;

    for (const segment of segments) {
      if (segment === "..") {
        upCount++;
      } else {
        break;
      }
    }

    const pathWithoutUps = segments.slice(upCount).join("/");

    const remainingFromSegments = fromSegments.slice(0, -upCount);
    const newPath =
      remainingFromSegments.length > 0
        ? `${remainingFromSegments.join("/")}/${pathWithoutUps}`
        : pathWithoutUps;

    return `url("${newPath}")`;
  });
}
