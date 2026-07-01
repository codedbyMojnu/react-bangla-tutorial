import { getMDXComponents } from '@/components/mdx';
import { pagesSource } from '@/lib/pages-source';
import { siteUrl } from '@/lib/shared';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const page = pagesSource.getPage([slug]);
  if (!page) notFound();

  const MDX = page.data.body;

  return (
    <article className="prose mx-auto w-full max-w-3xl flex-1 px-4 py-12">
      <h1>{page.data.title}</h1>
      <MDX components={getMDXComponents()} />
    </article>
  );
}

export async function generateStaticParams() {
  return pagesSource.getPages().map((page) => ({ slug: page.slugs[0] }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const page = pagesSource.getPage([slug]);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates: { canonical: `${siteUrl}${page.url}` },
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'profile',
      url: page.url,
    },
  };
}
