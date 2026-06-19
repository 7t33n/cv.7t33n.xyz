import type { Locale, PageMeta } from "@/types";
import { Resume } from "@/components";
import localeData from "./locale.json";

const data = (localeData as Locale).ru;

export const meta: PageMeta = data.meta;

export default function Page() {
  return <Resume data={data} />;
}
