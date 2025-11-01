import { getAllPosts } from '@katie-portofolio/posts';

export default function Index() {
  const posts = getAllPosts();

  return (
    <main>
      <h1>Katies Portfolio</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.excerpt}</p>
            <small>{new Date(post.date).toLocaleDateString()}</small>
          </li>
        ))}
      </ul>
    </main>
  );
}
