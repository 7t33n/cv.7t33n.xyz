import { Dirent } from "fs";
import fs from "fs/promises";
import path from "path";

function isSystemError(
  error: unknown,
): error is { code: string; message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof error.code === "string"
  );
}

function hasMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  );
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    if (isSystemError(err) && err.code === "ENOENT") {
      return false;
    }
    if (hasMessage(err)) {
      throw new Error(
        `Failed to check file existence for ${filePath}: ${err.message}`,
        { cause: err },
      );
    } else {
      throw new Error(`Failed to check file existence for ${filePath}`, {
        cause: err,
      });
    }
  }
}

export async function copyDirectory(src: string, dest: string): Promise<void> {
  const srcStats = await fs.lstat(src);
  if (!srcStats.isDirectory()) {
    throw new Error(`Source path is not a directory: ${src}`);
  }

  await fs.mkdir(dest, { recursive: true });

  const entries = await fs.readdir(src, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry: Dirent<string>): Promise<void> => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        return copyDirectory(srcPath, destPath);
      } else {
        return fs.copyFile(srcPath, destPath);
      }
    }),
  );
}

export async function findFiles(
  dir: string,
  extension: string,
): Promise<string[]> {
  const allFiles: string[] = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const directoryEntries = entries.filter((entry: Dirent<string>): boolean =>
      entry.isDirectory(),
    );
    const fileEntries = entries.filter(
      (entry: Dirent<string>): boolean => !entry.isDirectory(),
    );

    const subDirPromises = directoryEntries.map(
      (entry: Dirent<string>): Promise<string[]> =>
        findFiles(path.join(dir, entry.name), extension),
    );
    const subFiles = (await Promise.all(subDirPromises)).flat();
    allFiles.push(...subFiles);

    fileEntries.forEach((entry: Dirent<string>): void => {
      if (entry.name.endsWith(extension)) {
        allFiles.push(path.join(dir, entry.name));
      }
    });
  } catch (error) {
    if (hasMessage(error)) {
      console.warn(
        `Warning: Could not read directory ${dir}: ${error.message}`,
      );
    } else {
      console.warn(`Warning: An unknown error occurred in directory ${dir}`);
    }
  }

  return allFiles;
}
