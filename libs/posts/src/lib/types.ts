export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  /** Cover image filename in `libs/posts/src/md` (same folder as the post `.md`). */
  image?: string;
  /** URL for the Next app (`/posts/...`), set when posts are loaded. */
  imageSrc: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}
