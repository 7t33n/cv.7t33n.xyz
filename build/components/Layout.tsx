import type { Child } from "@/jsx/types";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";

export interface LayoutProps {
  title: string;
  children?: Child;
}

export function Layout({ title, children }: LayoutProps) {
  return (
    <>
      <Header title={title} />
      <Main>{children}</Main>
      <Footer />
    </>
  );
}
