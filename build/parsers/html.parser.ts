import { HTMLResource } from "../types";

export function parseHTML(html: string): HTMLResource[] {
  const resources: HTMLResource[] = [];

  const linkRegex = /<link\s+([^>]*href=["']([^"']+)["'][^>]*)>/gi;
  let match;

  while ((match = linkRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const attributes = match[1];
    const href = match[2];

    const attrs: Record<string, string> = {};
    const attrRegex = /(\w+)=["']([^"']*)["']/g;
    let attrMatch;

    while ((attrMatch = attrRegex.exec(attributes)) !== null) {
      attrs[attrMatch[1]] = attrMatch[2];
    }

    let type: HTMLResource["type"] = "icon";
    if (attrs.rel === "stylesheet") {
      type = "stylesheet";
    } else if (attrs.rel === "manifest") {
      type = "manifest";
    } else if (attrs.rel?.includes("icon")) {
      type = "icon";
    }

    resources.push({
      type,
      href,
      attributes: attrs,
      tag: fullTag,
    });
  }

  const imgRegex = /<img\s+([^>]*src=["']([^"']+)["'][^>]*)>/gi;

  while ((match = imgRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const attributes = match[1];
    const src = match[2];

    const attrs: Record<string, string> = {};
    const attrRegex = /(\w+)=["']([^"']*)["']/g;
    let attrMatch;

    while ((attrMatch = attrRegex.exec(attributes)) !== null) {
      attrs[attrMatch[1]] = attrMatch[2];
    }

    resources.push({
      type: "image",
      href: src,
      attributes: attrs,
      tag: fullTag,
    });
  }

  const scriptRegex = /<script\s+([^>]*src=["']([^"']+)["'][^>]*)>/gi;

  while ((match = scriptRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const attributes = match[1];
    const src = match[2];

    const attrs: Record<string, string> = {};
    const attrRegex = /(\w+)=["']([^"']*)["']/g;
    let attrMatch;

    while ((attrMatch = attrRegex.exec(attributes)) !== null) {
      attrs[attrMatch[1]] = attrMatch[2];
    }

    resources.push({
      type: "script",
      href: src,
      attributes: attrs,
      tag: fullTag,
    });
  }

  return resources;
}

export function isExternalPath(path: string): boolean {
  return /^https?:\/\//i.test(path);
}

export function normalizePath(path: string): string {
  return path.startsWith("/") ? path.slice(1) : path;
}
