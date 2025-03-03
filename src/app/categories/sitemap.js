/**
 * @fileoverview `sitemap.xml` generator for path `/categories`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { WEBSITE_URL, PATH_DOCS } from '@/constants';
import { readMarkdownTagTree } from '@/utils/fs';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function sitemap() {
  const tagTree = await readMarkdownTagTree(PATH_DOCS);

  return Object.keys(tagTree).map(tag => ({
    url: `${WEBSITE_URL}/categories/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
