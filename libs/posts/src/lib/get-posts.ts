import fs from 'fs';
import path from 'path';
import { toPostMeta } from './post-meta';
import { POSTS_PATH } from './path';
import { PostMeta } from './types';
import matter from 'gray-matter';

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(POSTS_PATH, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      return toPostMeta(file, data as Record<string, unknown>);
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
