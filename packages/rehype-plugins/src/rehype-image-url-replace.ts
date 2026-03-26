/**
 * @fileoverview rehype-image-url-replace.
 */

// TODO: Handle `g` or `y` flags in `searchValue` as it can cause unexpected behavior.

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface RehypeImageUrlReplaceOptions {
  searchValue: RegExp;
  replaceValue: string;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const yFlagRegex = /y/g;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A rehype plugin to replace image URLs in HTML content based on a provided regular expression and replacement string.
 * @example
 *
 * ```ts
 * import { rehype } from 'rehype';
 * import { rehypeImageUrlReplace } from '@lumir/rehype-plugins';
 *
 * const file = await rehype().use(rehypeImageUrlReplace, {
 *   searchValue: /^http:\/\//,
 *   replaceValue: 'https://',
 * }).process('<img src="http://example.com/image.png">');
 *
 * console.log(file.value); // Output: '<img src="https://example.com/image.png">'
 * ```
 */
export function rehypeImageUrlReplace({
  searchValue,
  replaceValue,
}: RehypeImageUrlReplaceOptions) {
  const sanitizedSearchValue = new RegExp(
    searchValue.source,
    searchValue.flags.replace(yFlagRegex, ''),
  );

  return (tree: Root) => {
    visit(tree, 'element', node => {
      if (
        node.tagName === 'img' &&
        sanitizedSearchValue.test(node.properties?.src as string)
      ) {
        node.properties = {
          ...node.properties,
          src: (node.properties?.src as string).replace(
            sanitizedSearchValue,
            replaceValue,
          ),
        };
      }
    });
  };
}
