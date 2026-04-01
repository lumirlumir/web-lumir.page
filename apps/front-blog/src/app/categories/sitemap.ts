/**
 * @fileoverview `sitemap.xml` generator for path `/categories`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MetadataRoute } from 'next';
import { WEBSITE_URL } from '@/constants';
import {
  listNonEmptyCategoryKeys,
  markdownCollectionCategory,
} from '@/utils/markdown-collection';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return listNonEmptyCategoryKeys(markdownCollectionCategory).map(categoryKey => ({
    url: `${WEBSITE_URL}/categories/${categoryKey}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
