import type { Child } from "@/jsx/types";

export interface SpoilerProps {
  title: string;
  children?: Child;
}

export function Spoiler({ title, children }: SpoilerProps) {
  return (
    <details>
      <summary>{title}</summary>
      {children}
    </details>
  );
}
