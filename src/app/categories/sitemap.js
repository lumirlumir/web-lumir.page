import { WEBSITE_URL, PATH_DOCS } from '@/constants';
import { readMarkdownTagTree } from '@/utils/fs';

export default async function sitemap() {
  const tagTree = await readMarkdownTagTree(PATH_DOCS);

  return Object.keys(tagTree).map(tag => ({
    url: `${WEBSITE_URL}/categories/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));
}
