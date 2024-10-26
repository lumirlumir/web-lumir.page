import { WEBSITE_URL, PATH_DOCS, EXT_MD_REGEXP } from '@/constants';
import { readMarkdownFilesFromDir } from '@/utils/fs';

export default async function sitemap() {
  const markdownDocuments = await readMarkdownFilesFromDir(PATH_DOCS);

  return markdownDocuments.map(({ basename, data: { updated } }) => ({
    url: `${WEBSITE_URL}/posts/${basename.replace(EXT_MD_REGEXP, '')}`,
    lastModified: updated,
    changeFrequency: 'monthly',
    priority: 1.0,
  }));
}
