/**
 * @fileoverview Defines the helper functions for converting markdown content to HTML.
 * @see https://github.com/remarkjs/remark/tree/main/packages/remark-parse#remark-parse (`remark-parse`)
 * @see https://github.com/remarkjs/remark-rehype#readme (`remark-rehype`)
 * @see https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify#rehype-stringify (`rehype-stringify`)
 * @see https://github.com/unifiedjs/unified#readme (`unified`)
 */

/* eslint-disable import/prefer-default-export -- TODO: Refactor to use named exports */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { rehypeImageLazyLoading, rehypeImageUrlReplace } from '@lumir/rehype-plugins';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts markdown content to HTML using `unified` with `remark` and `rehype`.
 * @param markdown The markdown content to convert.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeImageLazyLoading)
    .use(rehypeImageUrlReplace, {
      searchValue: /^\/public/,
      replaceValue: '',
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}
