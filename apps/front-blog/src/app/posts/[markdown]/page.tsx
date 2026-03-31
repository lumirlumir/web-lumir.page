/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type Metadata } from 'next';
import Katex from '@/components/article/katex';
import { markdownCollection, markdownToText } from '@/utils';
import { markdownToHtml, writeTitleIntoMarkdown } from '@/utils/markup';

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

/**
 * Control what happens when a dynamic segment is visited that was not generated with `generateStaticParams`.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config/dynamicParams
 */
export const dynamicParams = false;

/**
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams(): Promise<
  Awaited<PageProps<'/posts/[markdown]'>['params']>[]
> {
  return markdownCollection.all.map(({ slug }) => ({
    markdown: slug,
  }));
}

/**
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export async function generateMetadata({
  params,
}: PageProps<'/posts/[markdown]'>): Promise<Metadata> {
  const { markdown } = await params;
  const { title, description } = markdownCollection.slug[markdown].data;

  return {
    title: await markdownToText(title),
    description: await markdownToText(description),
  };
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }: PageProps<'/posts/[markdown]'>) {
  const { markdown } = await params;
  const {
    content,
    data: { title },
  } = markdownCollection.slug[markdown];

  return (
    <Katex
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: await markdownToHtml(writeTitleIntoMarkdown(title, content)),
      }}
    />
  );
}
