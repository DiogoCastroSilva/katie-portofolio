'use client';

import type { ContentItemMeta } from '@katie-portofolio/content';
import { dates } from '@katie-portofolio/utils';
import Image from 'next/image';

interface ContentDetailProps {
  content: ContentItemMeta;
}

export function ContentDetail({ content }: ContentDetailProps) {
  return (
    <article className="mx-auto flex w-full max-w-3xl grow flex-col gap-8 px-4 py-8">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-stone-200 dark:bg-stone-700">
        <Image
          src={content.imageSrc}
          alt={content.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 768px"
        />
      </div>
      <header className="flex flex-col gap-4">
        <h1 className="text-3xl leading-tight font-bold md:text-4xl">
          {content.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4">
          <time
            dateTime={content.date}
            className="text-sm text-gray-600 dark:text-gray-400"
          >
            {dates.formatISODate(content.date)}
          </time>
          {content.tags && content.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {content.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-sm font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>
      <div className="flex flex-col gap-6 text-gray-700 dark:text-gray-300">
        <div dangerouslySetInnerHTML={{ __html: content.body }} />
      </div>
    </article>
  );
}
