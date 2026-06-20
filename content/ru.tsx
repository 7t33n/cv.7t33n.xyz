import type { Locale, PageMeta } from "@/types";
import { Layout, Resume } from "@/components";
import localeData from "./locale.json";

const data = (localeData as Locale).ru;

export const meta: PageMeta = data.meta;

export default function Page() {
  return (
    <Layout title={data.meta.title}>
      <Resume data={data} />
    </Layout>
  );
}
