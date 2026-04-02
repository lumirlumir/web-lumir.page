/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import * as indexModule from './index.js';
import { rehypeImageLazyLoading } from './rehype-image-lazy-loading.js';
import { rehypeImageUrlReplace } from './rehype-image-url-replace.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  it('should re-export `rehypeImageLazyLoading` and `rehypeImageUrlReplace`', () => {
    assert.deepStrictEqual(Object.keys(indexModule).sort(), [
      'rehypeImageLazyLoading',
      'rehypeImageUrlReplace',
    ]);
    assert.strictEqual(indexModule.rehypeImageLazyLoading, rehypeImageLazyLoading);
    assert.strictEqual(indexModule.rehypeImageUrlReplace, rehypeImageUrlReplace);
  });
});
