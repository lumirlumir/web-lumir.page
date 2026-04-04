/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type Metadata } from 'next';
import {
  markdownCollectionAll,
  markdownCollectionSlug,
} from '@/utils/markdown-collection';
import { markdownToHtml } from '@/utils/markdown-to-html';
import { markdownToText } from '@/utils/markdown-to-text';

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
  return markdownCollectionAll.map(({ slug }) => ({
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
  const { title, description } = markdownCollectionSlug[markdown].data;

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
  } = markdownCollectionSlug[markdown];

  return (
    <div
      className="markdown-body"
      // eslint-disable-next-line react/no-danger -- Safe because the content comes from the local file and is controlled.
      dangerouslySetInnerHTML={{
        __html: await markdownToHtml(content, { title }),
      }}
    />
  );
}
