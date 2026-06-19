import type { ElementType, Props, VNode } from "./types";

export * from "./types";

export const Fragment: unique symbol = Symbol.for("jsx.fragment");

function jsx(type: ElementType, props?: Props): VNode {
  return { type, props: props ?? {} };
}

export { jsx, jsx as jsxs };
