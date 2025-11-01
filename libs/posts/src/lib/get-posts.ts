import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { POSTS_PATH } from './path';
import { PostMeta } from './types';

export function getAllPosts(): PostMeta[] {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(POSTS_PATH, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      return {
        slug: file.replace(/\.mdx?$/, ''),
        ...data,
      } as PostMeta;
    })
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
