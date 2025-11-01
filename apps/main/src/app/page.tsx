import { getAllPosts } from '@katie-portofolio/posts';
import PostsView from './PostsView';

export default async function Index() {
  const posts = await getAllPosts();
  return (
    <main>
      <h1>Katies Portfolio</h1>
      <PostsView posts={posts} />
    </main>
  );
}
