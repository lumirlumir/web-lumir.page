/**
 * @fileoverview Defines the helper functions for converting markdown content to HTML.
 * @see https://github.com/remarkjs/remark/tree/main/packages/remark-parse#remark-parse (`remark-parse`)
 * @see https://github.com/remarkjs/remark-rehype#readme (`remark-rehype`)
 * @see https://github.com/rehypejs/rehype-starry-night (`rehype-starry-night`)
 * @see https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify#rehype-stringify (`rehype-stringify`)
 * @see https://github.com/unifiedjs/unified#readme (`unified`)
 */

/* eslint-disable import/prefer-default-export -- TODO: Refactor to use named exports */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { rehypeImageLazyLoading, rehypeImageUrlReplace } from '@lumir/rehype-plugins';
import { remarkHeadingFromTitle } from '@lumir/remark-plugins';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStarryNight from 'rehype-starry-night';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface MarkdownToHtmlOptions {
  /**
   * Prepend an H1 heading generated from the provided title.
   */
  title?: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts markdown content to HTML asynchronously using `unified` with `remark` and `rehype`.
 * @param markdown The markdown content to convert.
 * @param options Optional settings for the conversion process.
 * @example
 * ```ts
 * import { markdownToHtml } from '@/utils/markdown-to-html';
 *
 * const markdown = 'Foo Bar Baz';
 * const html = await markdownToHtml(markdown, { title: 'Awesome Title' });
 *
 * console.log(html);
 * // Output:
 * // <h1>Awesome Title</h1>
 * // <p>Foo Bar Baz</p>
 * ```
 */
export async function markdownToHtml(
  markdown: string,
  options?: MarkdownToHtmlOptions,
): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkHeadingFromTitle, options?.title)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeImageLazyLoading)
    .use(rehypeImageUrlReplace, {
      searchValue: /^\/public/,
      replaceValue: '',
    })
    .use(rehypeStarryNight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}
