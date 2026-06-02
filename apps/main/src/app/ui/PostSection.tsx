'use client';
import { PostMeta } from '@katie-portofolio/posts';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';

type PostSectionProps = {
  posts: PostMeta[];
};

export const PostSection = ({ posts }: PostSectionProps) => {
  return (
    <section className="mx-4 rounded-2xl p-12 dark:bg-sky-50">
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
              {post.imageSrc ? (
                <div className="relative aspect-[16/9] w-full bg-stone-200 dark:bg-stone-700">
                  <Image
                    src={post.imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ) : (
                <div
                  className="aspect-[16/9] w-full bg-stone-200 dark:bg-stone-700"
                  aria-hidden
                />
              )}
              <div className="p-4">
                <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                {post.excerpt ? (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {post.excerpt}
                  </p>
                ) : null}
                <a
                  href={post.slug}
                  className="mt-4 inline-block text-blue-500 hover:underline"
                >
                  Read more
                </a>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
