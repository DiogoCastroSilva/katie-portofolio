import { getAllPosts } from '@katie-portofolio/posts';

import { AboutSection } from './ui/AboutSection';
import { PostSection } from './ui/PostSection';

export default async function Index() {
  const posts = await getAllPosts();

  return (
    <main className="flex flex-col gap-4 grow">
      <AboutSection />
      <PostSection posts={posts} />
    </main>
  );
}
