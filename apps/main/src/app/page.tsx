import { getAllProjects } from '@katie-portofolio/projects';

import { AboutSection } from './ui/AboutSection';
import { ContentCardSection } from './ui/ContentCardSection';

export default async function Index() {
  const projects = getAllProjects();

  return (
    <main className="flex grow flex-col gap-4">
      <AboutSection />
      <ContentCardSection
        heading="Projects"
        headingId="projects-heading"
        items={projects}
        hrefPrefix="/projects"
      />
    </main>
  );
}
