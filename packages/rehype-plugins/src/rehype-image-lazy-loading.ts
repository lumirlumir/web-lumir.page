/**
 * @fileoverview rehype-image-lazy-loading.
 */

/* eslint-disable import/prefer-default-export -- TODO */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { visit } from 'unist-util-visit';
import type { Root } from 'hast';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A rehype plugin to add lazy loading to images in HTML content.
 * @example
 *
 * ```ts
 * import { rehype } from 'rehype';
 * import { rehypeImageLazyLoading } from '@lumir/rehype-plugins';
 *
 * const file = await rehype().use(rehypeImageLazyLoading).process('<img src="http://example.com/image.png">');
 *
 * console.log(file.value); // Output: '<img src="http://example.com/image.png" loading="lazy">'
 * ```
 */
export function rehypeImageLazyLoading() {
  return (tree: Root) => {
    visit(tree, 'element', node => {
      if (node.tagName === 'img' && !node.properties?.loading) {
        node.properties = {
          ...node.properties,
          loading: 'lazy',
        };
      }
    });
  };
}
