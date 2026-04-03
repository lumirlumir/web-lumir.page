/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { rehypeImageLazyLoading, rehypeImageUrlReplace } from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`rehypeImageLazyLoading` should be defined', () => {
      assert.isDefined(rehypeImageLazyLoading);
      assert.strictEqual(typeof rehypeImageLazyLoading, 'function');
    });

    it('`rehypeImageUrlReplace` should be defined', () => {
      assert.isDefined(rehypeImageUrlReplace);
      assert.strictEqual(typeof rehypeImageUrlReplace, 'function');
    });
  });
});
