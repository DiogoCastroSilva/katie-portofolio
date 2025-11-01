import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { POST_PATH } from './path';
import { PostMeta } from './types';

export async function getPostBySlug(slug: string): Promise<PostMeta> {
  const postPath = POST_PATH(slug);
  return fs
    .readdirSync(postPath)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(postPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(content);

      return {
        slug: file.replace(/\.mdx?$/, ''),
        ...data,
      } as PostMeta;
    })?.[0];
}
