/**
 * @fileoverview Defines the helper functions for converting markdown content to plain text.
 * @see https://github.com/syntax-tree/mdast-util-to-string#readme (`mdast-util-to-string`)
 * @see https://github.com/remarkjs/remark/tree/main/packages/remark-parse#remark-parse (`remark-parse`)
 * @see https://github.com/remarkjs/strip-markdown (`strip-markdown`)
 * @see https://github.com/unifiedjs/unified#readme (`unified`)
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { toString } from 'mdast-util-to-string';
import remarkParse from 'remark-parse';
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
  const processor = unified().use(remarkParse).use(stripMarkdown);
  const tree = await processor.run(processor.parse(markdown));

  return toString(tree);
}

/**
 * Converts markdown content to plain text synchronously using `unified` with `remark`.
 * @param markdown The markdown content to convert.
 */
export function markdownToTextSync(markdown: string): string {
  const processor = unified().use(remarkParse).use(stripMarkdown);
  const tree = processor.runSync(processor.parse(markdown));

  return toString(tree);
}
