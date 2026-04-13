'use client';
import { motion, AnimatePresence } from 'motion/react';

type PostSectionProps = {
  posts: PostMeta[];
};

export const PostSection = ({ posts }: PostSectionProps) => {
  return (
    <section className="dark:bg-sky-50 rounded-2xl mx-4 p-12">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <AnimatePresence>
          {posts.slice(0, 6).map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {post.excerpt}
              </p>
              <a
                href={post.url}
                className="text-blue-500 hover:underline mt-4 inline-block"
              >
                Read more
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
