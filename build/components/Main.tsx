import type { Child } from "@/jsx/types";

export interface MainProps {
  children?: Child;
}

export function Main({ children }: MainProps) {
  return (
    <main id="main-content" tabindex="-1">
      <article class="markdown-body">{children}</article>
    </main>
  );
}
