import { join } from 'node:path';

import Katex from '@/components/article/Katex';
import { PATH_DOCS, EXT_MD, EXT_MD_REGEXP } from '@/constants';
import { readMarkdownFile, readMarkdownFilesFromDir } from '@/utils/fs';
import { markdownToText, markdownToJsxFromPath } from '@/utils/markup';

/* Custom Declaration */
function getFilePath(params) {
  return join(PATH_DOCS, `${params.markdown}${EXT_MD}`);
}

/* Next.js Declaration */
// Control what happens when a dynamic segment is visited that was not generated with `generateStaticParams`.
export const dynamicParams = false;

export async function generateStaticParams() {
  const markdownDocuments = await readMarkdownFilesFromDir(PATH_DOCS);
  const paths = markdownDocuments.map(markdownDocument => markdownDocument.basename);

  return paths.map(path => ({
    markdown: path.replace(EXT_MD_REGEXP, ''),
  }));
}

export async function generateMetadata({ params }) {
  const {
    data: { title, description },
  } = await readMarkdownFile(getFilePath(params));

  return {
    title: markdownToText(title),
    description: markdownToText(description),
  };
}

export default async function Page({ params }) {
  return (
    <Katex className="markdown-body">
      {await markdownToJsxFromPath(getFilePath(params))}
    </Katex>
  );
}
