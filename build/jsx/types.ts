export type Child =
  | VNode
  | string
  | number
  | boolean
  | null
  | undefined
  | Child[];

export interface Props {
  children?: Child;
  [key: string]: unknown;
}

export type ElementType = string | symbol | ((props: Props) => VNode | Child);

export interface VNode {
  type: ElementType;
  props: Props;
}

export interface RawProps extends Props {
  html: string;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JSX {
  export type Element = VNode;
  export interface ElementChildrenAttribute {
    children: object;
  }
  export interface IntrinsicElements {
    [elemName: string]: Record<string, unknown> & { children?: Child };
  }
}
