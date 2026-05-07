/**
 * @fileoverview remark-heading-from-title.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fromMarkdown } from 'mdast-util-from-markdown';
import type { Heading, Root } from 'mdast';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export interface RemarkHeadingFromTitleOptions {
  title?: string | undefined;
}

/**
 * A remark plugin to prepend an H1 heading generated from the provided title.
 * @example
 *
 * ```ts
 * import { remark } from 'remark';
 * import { remarkHeadingFromTitle } from '@lumir/remark-plugins';
 *
 * const file = await remark()
 *   .use(remarkHeadingFromTitle, { title: 'title' })
 *   .process('paragraph');
 *
 * console.log(file.value); // Output: '# title\n\nparagraph'
 * ```
 */
export function remarkHeadingFromTitle(options?: RemarkHeadingFromTitleOptions) {
  const { title } = options ?? {};

  if (typeof title !== 'string' || title === '') {
    return () => {};
  }

  return (tree: Root) => {
    tree.children.unshift(
      // Prepend an H1 heading generated from the provided title.
      fromMarkdown(`# ${title}`).children[0] as Heading,
    );
  };
}
