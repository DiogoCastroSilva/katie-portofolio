import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { toPostMeta } from './post-meta';
import { POSTS_PATH } from './path';
import { PostMeta } from './types';

export async function getPostBySlug(
  slug: string
): Promise<PostMeta | undefined> {
  for (const ext of ['.md', '.mdx'] as const) {
    const fileName = `${slug}${ext}`;
    const filePath = path.join(POSTS_PATH, fileName);
    if (!fs.existsSync(filePath)) {
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    return toPostMeta(fileName, data as Record<string, unknown>);
  }
  return undefined;
}
