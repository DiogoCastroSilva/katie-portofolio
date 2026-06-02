'use client';
import { PostMeta } from '@katie-portofolio/posts';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

type PostSectionProps = {
  posts: PostMeta[];
};

function postHref(slug: string): string {
  return `/${slug}/`;
}

export const PostSection = ({ posts }: PostSectionProps) => {
  return (
    <section
      className="mx-4 rounded-2xl p-12 dark:bg-sky-50"
      aria-labelledby="posts-heading"
    >
      <h2 id="posts-heading" className="mb-6 text-2xl font-bold">
        Posts
      </h2>
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <AnimatePresence>
          {posts.slice(0, 6).map((post, index) => (
            <motion.article
              key={post.slug}
              className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={postHref(post.slug)}
                className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                aria-label={`Read more: ${post.title}`}
              >
                <div className="relative aspect-[16/9] w-full bg-stone-200 dark:bg-stone-700">
                  <Image
                    src={post.imageSrc}
                    alt=""
                    fill
                    aria-hidden
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold group-hover:underline">
                    {post.title}
                  </h3>
                  {post.excerpt ? (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                  ) : null}
                  <span className="mt-4 inline-block text-blue-500 group-hover:underline">
                    Read more
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
