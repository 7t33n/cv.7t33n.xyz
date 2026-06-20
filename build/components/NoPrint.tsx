import type { Child } from "@/jsx/types";

export interface NoPrintProps {
  children?: Child;
}

export function NoPrint({ children }: NoPrintProps) {
  return <div class="no-print">{children}</div>;
}
