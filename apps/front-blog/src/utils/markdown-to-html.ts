/**
 * @fileoverview Defines the helper functions for converting markdown content to HTML.
 * @see https://github.com/remarkjs/remark-gfm (`remark-gfm`)
 * @see https://github.com/remarkjs/remark-math (`remark-math`)
 * @see https://github.com/remarkjs/remark/tree/main/packages/remark-parse#remark-parse (`remark-parse`)
 * @see https://github.com/remarkjs/remark-rehype#readme (`remark-rehype`)
 * @see https://github.com/rehypejs/rehype-github/tree/main/packages/alert#rehype-github-alert (`rehype-github-alert`)
 * @see https://github.com/rehypejs/rehype-github/tree/main/packages/color#rehype-github-color (`rehype-github-color`)
 * @see https://github.com/rehypejs/rehype-github/tree/main/packages/emoji#rehype-github-emoji (`rehype-github-emoji`)
 * @see https://github.com/remarkjs/remark-math/tree/main/packages/rehype-katex#rehype-katex (`rehype-katex`)
 * @see https://github.com/rehypejs/rehype-starry-night (`rehype-starry-night`)
 * @see https://github.com/rehypejs/rehype/tree/main/packages/rehype-stringify#rehype-stringify (`rehype-stringify`)
 * @see https://github.com/unifiedjs/unified#readme (`unified`)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { rehypeImageLazyLoading, rehypeImageUrlReplace } from '@lumir/rehype-plugins';
import { remarkHeadingFromTitle } from '@lumir/remark-plugins';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeGitHubAlert from 'rehype-github-alert';
import rehypeGitHubColor from 'rehype-github-color';
import rehypeGitHubEmoji from 'rehype-github-emoji';
import rehypeKatex from 'rehype-katex';
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
    .use(remarkGfm) // TODO: add tests in https://github.com/remarkjs/remark-gfm?tab=readme-ov-file#use
    .use(remarkMath) // TODO: add tests in https://github.com/remarkjs/remark-math
    .use(remarkHeadingFromTitle, options?.title)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeGitHubAlert) // TODO: add tests
    .use(rehypeGitHubColor) // TODO: add tests
    .use(rehypeGitHubEmoji) // TODO: add tests
    .use(rehypeKatex) // TODO: add tests
    .use(rehypeStarryNight)
    .use(rehypeImageLazyLoading)
    .use(rehypeImageUrlReplace, {
      searchValue: /^\/public/,
      replaceValue: '',
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}

/**
 * Converts markdown content to HTML asynchronously using `unified` with `remark` and `rehype`, without any additional plugins or transformations.
 * @param markdown The markdown content to convert.
 * @example
 * ```ts
 * import { markdownToHtmlLite } from '@/utils/markdown-to-html';
 *
 * const markdown = 'Foo Bar Baz';
 * const html = await markdownToHtmlLite(markdown);
 *
 * console.log(html);
 * // Output:
 * // <p>Foo Bar Baz</p>
 * ```
 */ // TODO: Add tests
export async function markdownToHtmlLite(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return String(file);
}
