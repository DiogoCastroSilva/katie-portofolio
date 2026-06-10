import fs from 'fs';
import matter from 'gray-matter';
import { marked } from 'marked';
import path from 'path';
import 'server-only';

import {
  ContentItemMeta,
  ContentLibrary,
  ContentLibraryConfig,
  ContentMeta,
} from './types';

const IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.gif',
  '.svg',
] as const;

function resolveContentPath(mdDir: string): string {
  return path.join(process.cwd(), '../../', mdDir);
}

function fileExistsInDir(contentPath: string, filename: string): boolean {
  const resolved = path.resolve(contentPath, filename);
  const root = path.resolve(contentPath);

  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    return false;
  }

  return fs.existsSync(resolved) && fs.statSync(resolved).isFile();
}

function resolveImage(
  contentPath: string,
  publicPrefix: string,
  placeholderFilename: string,
  slug: string,
  image?: string,
): string {
  if (image?.trim()) {
    const filename = path.basename(image.trim());
    if (fileExistsInDir(contentPath, filename)) {
      return `${publicPrefix}/${filename}`;
    }
  }

  for (const ext of IMAGE_EXTENSIONS) {
    const filename = `${slug}${ext}`;
    if (fileExistsInDir(contentPath, filename)) {
      return `${publicPrefix}/${filename}`;
    }
  }

  return `${publicPrefix}/${placeholderFilename}`;
}

function toContentMeta(
  contentPath: string,
  publicPrefix: string,
  placeholderFilename: string,
  file: string,
  data: Record<string, unknown>,
): ContentMeta {
  const slug = file.replace(/\.mdx?$/, '');
  const image =
    typeof data.image === 'string'
      ? data.image
      : typeof data.imageUrl === 'string'
        ? data.imageUrl
        : undefined;

  const { image: _image, imageUrl: _imageUrl, ...rest } = data;

  return {
    slug,
    ...rest,
    image,
    imageSrc: resolveImage(
      contentPath,
      publicPrefix,
      placeholderFilename,
      slug,
      image,
    ),
  } as ContentMeta;
}

export function createContentLibrary(
  config: ContentLibraryConfig,
): ContentLibrary {
  const contentPath = resolveContentPath(config.mdDir);

  function getAll(): ContentMeta[] {
    if (!fs.existsSync(contentPath)) {
      return [];
    }

    return fs
      .readdirSync(contentPath)
      .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
      .map((file) => {
        const filePath = path.join(contentPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(content);

        return toContentMeta(
          contentPath,
          config.publicPrefix,
          config.placeholderFilename,
          file,
          data as Record<string, unknown>,
        );
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }

  function getBySlug(slug: string): ContentMeta | undefined {
    for (const ext of ['.md', '.mdx'] as const) {
      const fileName = `${slug}${ext}`;
      const filePath = path.join(contentPath, fileName);
      if (!fs.existsSync(filePath)) {
        continue;
      }
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);
      return toContentMeta(
        contentPath,
        config.publicPrefix,
        config.placeholderFilename,
        fileName,
        data as Record<string, unknown>,
      );
    }
    return undefined;
  }

  function getContentBySlug(
    slug: string,
  ): Promise<ContentItemMeta | undefined> {
    return (async () => {
      for (const ext of ['.md', '.mdx'] as const) {
        const fileName = `${slug}${ext}`;
        const filePath = path.join(contentPath, fileName);
        if (!fs.existsSync(filePath)) {
          continue;
        }
        const content = fs.readFileSync(filePath, 'utf-8');
        const { data, content: body } = matter(content);
        const meta = toContentMeta(
          contentPath,
          config.publicPrefix,
          config.placeholderFilename,
          fileName,
          data as Record<string, unknown>,
        );
        const htmlBody = await marked(body);
        return { ...meta, body: htmlBody };
      }
      return undefined;
    })();
  }

  return { getAll, getBySlug, getContentBySlug };
}
