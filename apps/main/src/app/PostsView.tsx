import React from 'react';
import type { PostMeta } from '@katie-portofolio/posts';

type Props = {
  posts: PostMeta[];
};

export default function PostsView({ posts }: Props) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <small>{new Date(post.date).toLocaleDateString()}</small>
        </li>
      ))}
    </ul>
  );
}
