import fs from 'fs';
import path from 'path';

import { POSTS_PATH } from './path';

const IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
] as const;

export const POSTS_PUBLIC_PREFIX = '/posts';

function fileExistsInPostsDir(filename: string): boolean {
  const resolved = path.join(POSTS_PATH, filename);
  if (!resolved.startsWith(POSTS_PATH)) {
    return false;
  }
  return fs.existsSync(resolved) && fs.statSync(resolved).isFile();
}

export function resolvePostImage(
  slug: string,
  image?: string,
): string | undefined {
  if (image?.trim()) {
    const filename = path.basename(image.trim());

    if (fileExistsInPostsDir(filename)) {
      return `${POSTS_PUBLIC_PREFIX}/${filename}`;
    }
  }

  for (const ext of IMAGE_EXTENSIONS) {
    const filename = `${slug}${ext}`;
    if (fileExistsInPostsDir(filename)) {
      return `${POSTS_PUBLIC_PREFIX}/${filename}`;
    }
  }

  return undefined;
}

export function listPostImageFilenames(): string[] {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) =>
      IMAGE_EXTENSIONS.some((ext) => file.toLowerCase().endsWith(ext)),
    );
}
