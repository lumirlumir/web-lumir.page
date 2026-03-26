/**
 * @fileoverview Test for `rehype-image-url-replace.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { strictEqual } from 'node:assert';
import { rehype } from 'rehype';
import { describe, it } from 'vitest';
import { rehypeImageUrlReplace } from './rehype-image-url-replace.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('rehype-image-url-replace', () => {
  describe('when the image URL matches the search pattern', () => {
    it('should replace the image URL', async () => {
      const { value } = await rehype()
        .data('settings', { fragment: true })
        .use(rehypeImageUrlReplace, {
          searchValue: /^\/public/,
          replaceValue: '',
        })
        .process('<img src="/public/images/example.png">');

      strictEqual(value, '<img src="/images/example.png">');
    });

    it('should replace all matching image URLs', async () => {
      const { value } = await rehype()
        .data('settings', { fragment: true })
        .use(rehypeImageUrlReplace, {
          searchValue: /^\/public/,
          replaceValue: '',
        })
        .process(
          [
            '<img src="/public/images/example-1.png">',
            '',
            '<img src="/public/images/example-2.png">',
            '',
          ].join('\n'),
        );

      strictEqual(
        value,
        [
          '<img src="/images/example-1.png">',
          '',
          '<img src="/images/example-2.png">',
          '',
        ].join('\n'),
      );
    });
  });

  describe('when the image URL does not match the search pattern', () => {
    it('should keep the original image URL', async () => {
      const { value } = await rehype()
        .data('settings', { fragment: true })
        .use(rehypeImageUrlReplace, {
          searchValue: /^\/public/,
          replaceValue: '',
        })
        .process('<img src="/assets/example.png">');

      strictEqual(value, '<img src="/assets/example.png">');
    });
  });
});
