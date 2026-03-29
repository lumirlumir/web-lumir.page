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
  loadMarkdownCollection,
} from '@/utils/markdown-collection';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const { category } = await loadMarkdownCollection();
const categoryKeys = listNonEmptyCategoryKeys(category);

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return categoryKeys.map(categoryKey => ({
    url: `${WEBSITE_URL}/categories/${categoryKey}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
