import {
  getAllPublications,
  getPublicationContentBySlug,
} from '@katie-portofolio/publications';
import { notFound } from 'next/navigation';
import { ContentDetail } from '../../ui/ContentDetail';

interface PublicationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPublications().map((publication) => ({
    slug: publication.slug,
  }));
}

export async function generateMetadata({ params }: PublicationPageProps) {
  const { slug } = await params;
  const publication = await getPublicationContentBySlug(slug);

  if (!publication) {
    return {
      title: 'Publication Not Found | Kathleen Miller',
    };
  }

  return {
    title: `${publication.title} | Kathleen Miller`,
    description: publication.excerpt || `Publication: ${publication.title}`,
  };
}

export default async function PublicationPage({
  params,
}: PublicationPageProps) {
  const { slug } = await params;
  const publication = await getPublicationContentBySlug(slug);

  if (!publication) {
    notFound();
  }

  return (
    <main className="mx-4 flex grow flex-col rounded-2xl dark:bg-sky-50">
      <ContentDetail content={publication} />
    </main>
  );
}
