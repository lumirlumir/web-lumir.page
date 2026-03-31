/**
 * @fileoverview Defines the helper functions for converting markdown content to plain text.
 * @see https://github.com/remarkjs/remark/tree/main/packages/remark-stringify#remark-stringify (`remark-stringify`)
 * @see https://github.com/remarkjs/strip-markdown (`strip-markdown`)
 * @see https://github.com/unifiedjs/unified#readme (`unified`)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import stripMarkdown from 'strip-markdown';
import { unified } from 'unified';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts markdown content to plain text asynchronously using `unified` with `remark`.
 * @param markdown The markdown content to convert.
 */
export async function markdownToText(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(stripMarkdown)
    .use(remarkStringify)
    .process(markdown);

  return String(file).trimEnd();
}

/**
 * Converts markdown content to plain text synchronously using `unified` with `remark`.
 * @param markdown The markdown content to convert.
 */
export function markdownToTextSync(markdown: string): string {
  const file = unified()
    .use(remarkParse)
    .use(stripMarkdown)
    .use(remarkStringify)
    .processSync(markdown);

  return String(file).trimEnd();
}
