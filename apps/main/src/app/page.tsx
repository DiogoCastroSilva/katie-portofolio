import { getAllPosts } from '@katie-portofolio/posts';
import Image from 'next/image';
import PostsView from './PostsView';

const PROFILE_PIC_SIZE = 400;

export default async function Index() {
  const posts = await getAllPosts();
  return (
    <main className="flex flex-col gap-4 grow">
      <section className="dark:bg-sky-50 rounded-2xl mx-4 p-12">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4">
            <Image
              src="/profile.jpeg"
              alt="Profile picture of Kathleen Miller"
              width={PROFILE_PIC_SIZE}
              height={PROFILE_PIC_SIZE}
              loading="eager"
              className="w-62 h-62 rounded-full mr-4"
            />
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">Kathleen Miller</h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Software Engineer, Blogger, and Tech Enthusiast
              </p>
            </div>
          </div>
          <div className="flex flex-12">
            <h2 className="text-2xl font-bold">About Me</h2>
          </div>
        </div>
      </section>
      <section className="dark:bg-sky-50 rounded-2xl mx-4 p-12">
        <PostsView posts={posts} />
      </section>
    </main>
  );
}
