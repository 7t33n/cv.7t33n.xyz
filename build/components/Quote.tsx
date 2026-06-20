import type { Child } from "@/jsx/types";

export interface QuoteProps {
  children?: Child;
}

export function Quote({ children }: QuoteProps) {
  return (
    <blockquote>
      <p>{children}</p>
    </blockquote>
  );
}
