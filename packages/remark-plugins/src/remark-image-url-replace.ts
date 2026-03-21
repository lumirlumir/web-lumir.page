/**
 * @fileoverview remark-image-url-replace.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { visit } from 'unist-util-visit';
import type { Root } from 'mdast';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface RemarkImageUrlReplaceOptions {
  searchValue: RegExp;
  replaceValue: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A remark plugin to replace image URLs in markdown content based on a provided regular expression and replacement string.
 * @example
 *
 * ```ts
 * import { remark } from 'remark';
 * import { remarkImageUrlReplace } from '@lumir/remark-plugins';
 *
 * const file = await remark().use(remarkImageUrlReplace({
 *   searchValue: /^http:\/\//,
 *   replaceValue: 'https://',
 * })).process('![Image](http://example.com/image.png)');
 *
 * console.log(file.value); // Output: '![Image](https://example.com/image.png)'
 * ```
 */
export function remarkImageUrlReplace({
  searchValue,
  replaceValue,
}: RemarkImageUrlReplaceOptions) {
  return (tree: Root) => {
    visit(tree, 'image', node => {
      if (searchValue.test(node.url)) {
        node.url = node.url.replace(searchValue, replaceValue);
      }
    });
  };
}
