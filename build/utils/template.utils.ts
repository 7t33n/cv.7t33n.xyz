import fs from "fs/promises";

function flattenObject(
  obj: Record<string, unknown>,
  prefix = "",
): Record<string, string> {
  const flattened: Record<string, string> = {};

  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(
        flattened,
        flattenObject(value as Record<string, unknown>, newKey),
      );
    } else {
      flattened[newKey] = String(value);
    }
  }

  return flattened;
}

export async function loadTemplate(
  templatePath: string,
  variables: Record<string, unknown>,
): Promise<string> {
  let template = await fs.readFile(templatePath, "utf8");
  const flattenedVariables = flattenObject(variables);

  for (const [key, value] of Object.entries(flattenedVariables)) {
    const placeholder = new RegExp(`{{\\s*${key}\\s*}}`, "g");
    const stringValue =
      value !== null && value !== undefined ? String(value) : "";
    template = template.replaceAll(placeholder, stringValue);
  }

  return template;
}
