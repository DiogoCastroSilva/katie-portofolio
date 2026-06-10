import {
  getAllProjects,
  getProjectContentBySlug,
} from '@katie-portofolio/projects';
import { notFound } from 'next/navigation';
import { ContentDetail } from '../../ui/ContentDetail';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectContentBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Kathleen Miller',
    };
  }

  return {
    title: `${project.title} | Kathleen Miller`,
    description: project.excerpt || `Project: ${project.title}`,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectContentBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex grow flex-col">
      <ContentDetail content={project} />
    </main>
  );
}
