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
import { type SortableFrontmatterKey } from '@/data/frontmatter';
import { type SortKey } from '@/data/sort';
import {
  listNonEmptyCategoryKeys,
  markdownCollectionCategory,
} from '@/utils/markdown-collection';
import { compareMarkdownDocument } from '@/utils/compare';

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
  return listNonEmptyCategoryKeys(markdownCollectionCategory).map(categoryKey => ({
    tag: categoryKey,
  }));
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

  const normalizedSort: SortableFrontmatterKey =
    sort === 'title' || sort === 'created' || sort === 'updated' ? sort : 'updated';
  const normalizedOrder: SortKey = order === 'asc' || order === 'desc' ? order : 'desc';

  return (
    <Suspense
      key={normalizedSort + normalizedOrder}
      fallback={<Loading content="목록" />}
    >
      {markdownCollectionCategory[tag as CategoryKey]
        ?.toSorted(compareMarkdownDocument(normalizedSort, normalizedOrder))
        .map(vMarkdownFile => (
          <Content key={vMarkdownFile.slug} vMarkdownFile={vMarkdownFile} />
        ))}
    </Suspense>
  );
}
