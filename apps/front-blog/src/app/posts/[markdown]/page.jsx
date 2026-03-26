/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { frontMatter } from '@lumir/utils';
import Katex from '@/components/article/katex';
import { PATH_DOCS, EXT_MD_REGEXP } from '@/constants';
import { readMarkdownFilesFromDir } from '@/utils/fs';
import { markdownToText, markdownToHtml, writeTitleIntoMarkdown } from '@/utils/markup';

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

// Control what happens when a dynamic segment is visited that was not generated with `generateStaticParams`.
export const dynamicParams = false;

export async function generateStaticParams() {
  const markdownDocuments = await readMarkdownFilesFromDir(PATH_DOCS);
  const paths = markdownDocuments.map(markdownDocument => markdownDocument.basename);

  return paths.map(path => ({
    markdown: path.replace(EXT_MD_REGEXP, ''),
  }));
}

export async function generateMetadata({ params }) {
  const { default: markdown } = await import(
    `../../../posts/docs/${(await params).markdown}.md`
  );
  const {
    data: { title, description },
  } = frontMatter(markdown);

  return {
    title: markdownToText(title),
    description: markdownToText(description),
  };
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params }) {
  const { default: markdown } = await import(
    `../../../posts/docs/${(await params).markdown}.md`
  );
  const {
    content,
    data: { title },
  } = frontMatter(markdown);

  return (
    <Katex
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: await markdownToHtml(writeTitleIntoMarkdown(title, content)),
      }}
    />
  );
}
