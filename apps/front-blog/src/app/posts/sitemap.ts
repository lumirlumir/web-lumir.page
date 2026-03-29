/**
 * @fileoverview `sitemap.xml` generator for path `/posts`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MetadataRoute } from 'next';
import { WEBSITE_URL, PATH_DOCS, EXT_MD_REGEXP } from '@/constants';
import { readMarkdownFilesFromDir } from '@/utils/fs';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const markdownDocuments = await readMarkdownFilesFromDir(PATH_DOCS);

  return markdownDocuments.map(({ basename, data: { updated } }) => ({
    url: `${WEBSITE_URL}/posts/${basename.replace(EXT_MD_REGEXP, '')}`,
    lastModified: updated,
    changeFrequency: 'monthly',
    priority: 1.0,
  }));
}
