import fs from "fs/promises";
import path from "path";
import zlib from "node:zlib";
import { promisify } from "node:util";
import { findFiles } from "@/utils/fs.utils";

const brotliCompress = promisify(zlib.brotliCompress);

const FIRST_PACKET_BUDGET = 14 * 1024;

async function compressToBrotli(filePath: string): Promise<number> {
  const source = await fs.readFile(filePath);
  const compressed = await brotliCompress(source, {
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
      [zlib.constants.BROTLI_PARAM_SIZE_HINT]: source.length,
    },
  });

  await fs.writeFile(`${filePath}.br`, compressed);
  return compressed.length;
}

export async function compressHtmlOutputs(outDir: string): Promise<void> {
  const htmlFiles = await findFiles(outDir, ".html");

  const pages = await Promise.all(
    htmlFiles.map(async (filePath) => ({
      name: path.basename(filePath),
      size: await compressToBrotli(filePath),
    })),
  );

  const tooBig = pages.filter((page) => page.size > FIRST_PACKET_BUDGET);
  if (tooBig.length > 0) {
    const details = tooBig
      .map((page) => `${page.name}.br is ${page.size} bytes`)
      .join(", ");
    throw new Error(
      `${details} — too big for the first TCP packet (budget ${FIRST_PACKET_BUDGET} bytes)`,
    );
  }

  pages.forEach((page) => {
    const usage = ((page.size / FIRST_PACKET_BUDGET) * 100).toFixed(1);
    console.log(
      `First packet: ${page.name}.br fits in ${page.size}/${FIRST_PACKET_BUDGET} bytes (${usage}%)`,
    );
  });
}
