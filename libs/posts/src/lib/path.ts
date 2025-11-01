import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), '../../libs/posts/src/md');
export const POST_PATH = (slug: string) =>
  path.join(POSTS_PATH, `${slug}.md`);
