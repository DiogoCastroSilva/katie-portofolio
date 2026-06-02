export interface ContentMeta {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
  /** Cover image filename in the content `md` folder (same folder as the `.md` file). */
  image?: string;
  /** URL served by the Next app, set when content is loaded. */
  imageSrc: string;
}

export interface ContentLibraryConfig {
  /** Workspace-relative path to markdown files, e.g. `libs/projects/src/md`. */
  mdDir: string;
  /** Public URL prefix, e.g. `/projects`. */
  publicPrefix: string;
  /** Fallback image filename in the md folder. */
  placeholderFilename: string;
}

export interface ContentLibrary {
  getAll: () => ContentMeta[];
  getBySlug: (slug: string) => ContentMeta | undefined;
}
