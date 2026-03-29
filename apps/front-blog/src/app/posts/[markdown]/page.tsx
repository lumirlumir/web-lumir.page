/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type Metadata } from 'next';
import { frontmatter } from '@lumir/utils';
import Katex from '@/components/article/katex';
import { PATH_DOCS, EXT_MD_REGEXP } from '@/constants';
import { type Frontmatter } from '@/data/frontmatter';
import { readMarkdownFilesFromDir } from '@/utils/fs';
import { markdownToText, markdownToHtml, writeTitleIntoMarkdown } from '@/utils/markup';

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
  const markdownDocuments = await readMarkdownFilesFromDir(PATH_DOCS);
  const paths = markdownDocuments.map(markdownDocument => markdownDocument.basename);

  return paths.map(path => ({
    markdown: path.replace(EXT_MD_REGEXP, ''),
  }));
}

/**
 * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata
 */
export async function generateMetadata({
  params,
}: PageProps<'/posts/[markdown]'>): Promise<Metadata> {
  const { markdown } = await params;
  const { default: markdownContent } = await import(`../../../posts/docs/${markdown}.md`);
  const {
    data: { title, description },
  } = frontmatter(markdownContent) as { data: Frontmatter }; // TODO: Update the `frontmatter` function to support generic type parameters for better type safety and inference.

  return {
    title: markdownToText(title),
    description: markdownToText(description),
  };
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }: PageProps<'/posts/[markdown]'>) {
  const { markdown } = await params;
  const { default: markdownContent } = await import(`../../../posts/docs/${markdown}.md`);
  const {
    content,
    data: { title },
  } = frontmatter(markdownContent) as { content: string; data: Frontmatter }; // TODO: Update the `frontmatter` function to support generic type parameters for better type safety and inference.

  return (
    <Katex
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: await markdownToHtml(writeTitleIntoMarkdown(title, content)),
      }}
    />
  );
}
