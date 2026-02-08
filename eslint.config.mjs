import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import markdown from "eslint-plugin-markdown";
import html from "eslint-plugin-html";

export default [
  {
    ignores: ["dist/", "node_modules/", ".git/", "public/assets/"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...markdown.configs.recommended,
  {
    files: ["**/*.html"],
    plugins: { html },
  },
];
