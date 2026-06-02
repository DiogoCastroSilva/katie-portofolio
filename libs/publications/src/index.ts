import {
  createContentLibrary,
  type ContentMeta,
} from '@katie-portofolio/content';

export type PublicationMeta = ContentMeta;

const publications = createContentLibrary({
  mdDir: 'libs/publications/src/md',
  publicPrefix: '/publications',
  placeholderFilename: 'publication-placeholder.svg',
});

export const getAllPublications = publications.getAll;
export const getPublicationBySlug = publications.getBySlug;
