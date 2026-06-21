import type { Child, Props, RawProps, VNode } from "./types";
import { Fragment } from "./jsx-runtime";

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
]);

export const RAW: unique symbol = Symbol.for("jsx.raw");

export function Raw(props: RawProps): VNode {
  return { type: RAW, props };
}

function escapeText(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function primitiveToString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return "";
}

function styleToString(style: Record<string, unknown>): string {
  return Object.entries(style)
    .filter(([, v]) => v != null && v !== false)
    .map(([prop, v]) => {
      const name = prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
      return `${name}:${primitiveToString(v)}`;
    })
    .join(";");
}

function renderAttrs(props: Props): string {
  let out = "";

  for (const [key, value] of Object.entries(props)) {
    if (
      key === "children" ||
      key === "key" ||
      key === "dangerouslySetInnerHTML"
    ) {
      continue;
    }
    if (value == null || value === false) {
      continue;
    }

    const name = key === "className" ? "class" : key;

    if (value === true) {
      out += ` ${name}`;
      continue;
    }

    if (name === "style" && typeof value === "object") {
      out += ` style="${escapeAttr(styleToString(value as Record<string, unknown>))}"`;
      continue;
    }

    out += ` ${name}="${escapeAttr(primitiveToString(value))}"`;
  }

  return out;
}

function renderNode(node: VNode): string {
  const { type, props } = node;

  if (type === RAW) {
    return primitiveToString(props.html);
  }

  if (type === Fragment) {
    return renderChild(props.children);
  }

  if (typeof type === "function") {
    return renderChild(type(props));
  }

  const tag = String(type);
  const attrs = renderAttrs(props);

  if (VOID_ELEMENTS.has(tag)) {
    return `<${tag}${attrs}>`;
  }

  const dangerous = props.dangerouslySetInnerHTML as
    | { __html?: string }
    | undefined;
  const inner = dangerous?.__html ?? renderChild(props.children);

  return `<${tag}${attrs}>${inner}</${tag}>`;
}

export function renderChild(child: Child): string {
  if (child == null || child === false || child === true) {
    return "";
  }
  if (Array.isArray(child)) {
    return child.map(renderChild).join("");
  }
  if (typeof child === "string") {
    return escapeText(child);
  }
  if (typeof child === "number") {
    return escapeText(String(child));
  }
  return renderNode(child);
}
