export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}
