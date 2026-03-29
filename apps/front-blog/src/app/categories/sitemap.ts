/**
 * @fileoverview `sitemap.xml` generator for path `/categories`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MetadataRoute } from 'next';
import { WEBSITE_URL } from '@/constants';
import { readMarkdownTagTree } from '@/utils/fs';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const tagTree = await readMarkdownTagTree();

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return Object.keys(tagTree).map(tag => ({
    url: `${WEBSITE_URL}/categories/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
