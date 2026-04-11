import React from 'react';
import type { PostMeta } from '@katie-portofolio/posts';

type Props = {
  posts: PostMeta[];
};

/** Stable server/client output (avoids locale/timezone hydration mismatches). */
function formatPostDate(isoDate: string): string {
  const trimmed = isoDate.trim();
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(trimmed)
    ? `${trimmed}T12:00:00.000Z`
    : trimmed;
  const d = new Date(normalized);
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(d);
}

export default function PostsView({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </li>
      ))}
    </ul>
  );
}
