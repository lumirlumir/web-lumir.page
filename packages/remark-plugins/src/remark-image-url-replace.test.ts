/**
 * @fileoverview Test for `remark-image-url-replace.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { strictEqual } from 'node:assert';
import { remark } from 'remark';
import { describe, it } from 'vitest';
import { remarkImageUrlReplace } from './remark-image-url-replace.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('remark-image-url-replace', () => {
  describe('when the image URL matches the search pattern', () => {
    it('should replace the image URL', async () => {
      const { value } = await remark()
        .use(remarkImageUrlReplace, {
          searchValue: /^\/public/,
          replaceValue: '',
        })
        .process('![Image](/public/images/example.png)\n');

      strictEqual(value, '![Image](/images/example.png)\n');
    });

    it('should replace all matching image URLs', async () => {
      const { value } = await remark()
        .use(remarkImageUrlReplace, {
          searchValue: /^\/public/,
          replaceValue: '',
        })
        .process(
          [
            '![Image 1](/public/images/example-1.png)',
            '',
            '![Image 2](/public/images/example-2.png)',
            '',
          ].join('\n'),
        );

      strictEqual(
        value,
        [
          '![Image 1](/images/example-1.png)',
          '',
          '![Image 2](/images/example-2.png)',
          '',
        ].join('\n'),
      );
    });
  });

  describe('when the image URL does not match the search pattern', () => {
    it('should keep the original image URL', async () => {
      const { value } = await remark()
        .use(remarkImageUrlReplace, {
          searchValue: /^\/public/,
          replaceValue: '',
        })
        .process('![Image](/assets/example.png)\n');

      strictEqual(value, '![Image](/assets/example.png)\n');
    });
  });
});
