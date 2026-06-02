import {
  createContentLibrary,
  type ContentMeta,
} from '@katie-portofolio/content';

export type ProjectMeta = ContentMeta;

const projects = createContentLibrary({
  mdDir: 'libs/projects/src/md',
  publicPrefix: '/projects',
  placeholderFilename: 'project-placeholder.svg',
});

export const getAllProjects = projects.getAll;
export const getProjectBySlug = projects.getBySlug;
