/**
 * @fileoverview `sitemap.xml` generator for path `/posts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MetadataRoute } from 'next';
import { WEBSITE_URL } from '@/constants';
import { loadMarkdownCollection } from '@/utils/markdown-collection';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const { all } = await loadMarkdownCollection();

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return all.map(({ slug, data: { updated } }) => ({
    url: `${WEBSITE_URL}/posts/${slug}`,
    lastModified: updated,
    changeFrequency: 'monthly',
    priority: 1.0,
  }));
}
