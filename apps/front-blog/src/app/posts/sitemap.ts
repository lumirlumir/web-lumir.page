/**
 * @fileoverview `sitemap.xml` generator for path `/posts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MetadataRoute } from 'next';
import { WEBSITE_URL } from '@/constants';
import { markdownCollection } from '@/utils/markdown-collection';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return markdownCollection.all.map(({ slug, data: { updated } }) => ({
    url: `${WEBSITE_URL}/posts/${slug}`,
    lastModified: updated,
    changeFrequency: 'monthly',
    priority: 1.0,
  }));
}
