'use client';
import type { ContentMeta } from '@katie-portofolio/content';
import { dates } from '@katie-portofolio/utils';
import { AnimatePresence, motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';

type ContentCardSectionProps = {
  heading: string;
  headingId: string;
  items: ContentMeta[];
  /** URL prefix for item detail pages, e.g. `/projects`. */
  hrefPrefix: string;
  limit?: number;
  emptyMessage?: string;
};

function itemHref(prefix: string, slug: string): string {
  return `${prefix}/${slug}/`;
}

export function ContentCardSection({
  heading,
  headingId,
  items,
  hrefPrefix,
  limit = 6,
  emptyMessage,
}: ContentCardSectionProps) {
  const visibleItems = items.slice(0, limit);

  return (
    <section
      className="mx-4 rounded-2xl p-12 dark:bg-sky-50"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="mb-6 text-2xl font-bold">
        {heading}
      </h2>
      {visibleItems.length === 0 && emptyMessage ? (
        <p className="text-gray-600 dark:text-gray-400">{emptyMessage}</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.2 }}
        >
          <AnimatePresence>
            {visibleItems.map((item, index) => (
              <motion.article
                key={item.slug}
                className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={itemHref(hrefPrefix, item.slug)}
                  className="group block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                  aria-label={`Read more: ${item.title}`}
                >
                  <div className="relative aspect-[16/9] w-full bg-stone-200 dark:bg-stone-700">
                    <Image
                      src={item.imageSrc}
                      alt=""
                      fill
                      aria-hidden
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <time dateTime={item.date}>
                      {dates.formatISODate(item.date)}
                    </time>
                    <h3 className="mb-2 text-xl font-semibold group-hover:underline">
                      {item.title}
                    </h3>
                    {item.excerpt ? (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.excerpt}
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
      )}
    </section>
  );
}
