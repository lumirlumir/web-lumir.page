/**
 * @fileoverview Page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { Suspense } from 'react';
import Content from '@/components/article/content';
import Loading from '@/components/common/loading';
import { type CategoryKey } from '@/data/category';
import { type FrontmatterKeySortable } from '@/data/frontmatter';
import { type SortKey } from '@/data/sort';
import { compareMarkdownDocument } from '@/utils/compare';
import { readMarkdownTagTree } from '@/utils/fs';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const tagTree = await readMarkdownTagTree();

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
  Awaited<PageProps<'/categories/[tag]'>['params']>[]
> {
  const tags = Object.keys(tagTree);

  return tags.map(tag => ({ tag }));
}

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page({
  params,
  searchParams,
}: PageProps<'/categories/[tag]'>) {
  const { tag } = await params;
  const { sort, order } = await searchParams; // TODO: Rename `sort` and `order`.

  const normalizedSort: FrontmatterKeySortable =
    sort === 'title' || sort === 'created' || sort === 'updated' ? sort : 'updated';
  const normalizedOrder: SortKey = order === 'asc' || order === 'desc' ? order : 'desc';

  return (
    <Suspense
      key={normalizedSort + normalizedOrder}
      fallback={<Loading content="목록" />}
    >
      {tagTree[tag as CategoryKey]
        ?.toSorted(compareMarkdownDocument(normalizedSort, normalizedOrder))
        .map(vMarkdownFileMeta => (
          <Content
            key={vMarkdownFileMeta.basename}
            vMarkdownFileMeta={vMarkdownFileMeta}
          />
        ))}
    </Suspense>
  );
}
