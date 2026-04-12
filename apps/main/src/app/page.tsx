import { getAllPosts } from '@katie-portofolio/posts';
import PostsView from './PostsView';

export default async function Index() {
  const posts = await getAllPosts();
  return (
    <main>
      <section className="dark:bg-sky-50 rounded-2xl mx-4 p-4">
        <h1>Katies Portfolio</h1>
        <PostsView posts={posts} />
      </section>
    </main>
  );
}
