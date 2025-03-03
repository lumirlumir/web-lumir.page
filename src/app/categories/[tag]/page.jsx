/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Suspense } from 'react';

import Content from '@/components/article/Content';
import Loading from '@/components/common/Loading';
import { PATH_DOCS } from '@/constants';
import { compareMarkdownDocument } from '@/utils/compare';
import { readMarkdownTagTree } from '@/utils/fs';

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

// Control what happens when a dynamic segment is visited that was not generated with `generateStaticParams`.
export const dynamicParams = false;

export async function generateStaticParams() {
  const tagTree = await readMarkdownTagTree(PATH_DOCS);
  const tags = Object.keys(tagTree);

  return tags.map(tag => ({ tag }));
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({ params, searchParams }) {
  const { sort = 'updated', order = 'desc' } = searchParams;
  const tagTree = await readMarkdownTagTree(PATH_DOCS);

  return (
    <Suspense key={sort + order} fallback={<Loading content="목록" />}>
      {tagTree[params.tag]
        .sort(compareMarkdownDocument(sort, order))
        .map(markdownDocument => (
          <Content key={markdownDocument.basename} markdownDocument={markdownDocument} />
        ))}
    </Suspense>
  );
}
