/**
 * @fileoverview `sitemap.xml` generator for path `/posts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MetadataRoute } from 'next';
import { WEBSITE_URL } from '@/constants';
import { readMarkdownFilesFromDir } from '@/utils/fs';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const markdownDocuments = await readMarkdownFilesFromDir();

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return markdownDocuments.map(({ basename, data: { updated } }) => ({
    url: `${WEBSITE_URL}/posts/${basename}`,
    lastModified: updated,
    changeFrequency: 'monthly',
    priority: 1.0,
  }));
}
