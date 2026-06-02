import { getAllProjects } from '@katie-portofolio/projects';
import { ContentCardSection } from '../ui/ContentCardSection';

export const metadata = {
  title: 'Projects | Kathleen Miller',
  description: 'Projects by Kathleen Miller.',
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="flex grow flex-col gap-4 py-8">
      <ContentCardSection
        heading="Projects"
        headingId="projects-heading"
        items={projects}
        hrefPrefix="/projects"
        emptyMessage="Projects are coming soon."
      />
    </main>
  );
}
