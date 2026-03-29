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
// Typedef
// --------------------------------------------------------------------------------

interface Params {
  markdown: string;
}

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

/**
 * Control what happens when a dynamic segment is visited that was not generated with `generateStaticParams`.
 */
export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const markdownDocuments = await readMarkdownFilesFromDir(PATH_DOCS);
  const paths = markdownDocuments.map(markdownDocument => markdownDocument.basename);

  return paths.map(path => ({
    markdown: path.replace(EXT_MD_REGEXP, ''),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { default: markdown } = await import(
    `../../../posts/docs/${(await params).markdown}.md`
  );
  const {
    data: { title, description },
  } = frontmatter(markdown) as { data: Frontmatter }; // TODO: Update the `frontmatter` function to support generic type parameters for better type safety and inference.

  return {
    title: markdownToText(title),
    description: markdownToText(description),
  };
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }: { params: Promise<Params> }) {
  const { default: markdown } = await import(
    `../../../posts/docs/${(await params).markdown}.md`
  );
  const {
    content,
    data: { title },
  } = frontmatter(markdown) as { content: string; data: Frontmatter }; // TODO: Update the `frontmatter` function to support generic type parameters for better type safety and inference.

  return (
    <Katex
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: await markdownToHtml(writeTitleIntoMarkdown(title, content)),
      }}
    />
  );
}
