import type { Child } from "@/jsx/types";

export interface CompanyProps {
  name: string;
  location?: string;
  remote?: string;
}

export interface RoleProps {
  title: string;
  period: string;
  bullets: string[];
}

export interface QuoteProps {
  children?: Child;
}

export interface NoPrintProps {
  children?: Child;
}

export interface SpoilerProps {
  title: string;
  children?: Child;
}
