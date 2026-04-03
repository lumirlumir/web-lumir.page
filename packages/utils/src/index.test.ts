/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { cn, frontmatter, frontmatterRegex } from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`cn` should be defined', () => {
      assert.isDefined(cn);
      assert.strictEqual(typeof cn, 'function');
    });

    it('`frontmatter` should be defined', () => {
      assert.isDefined(frontmatter);
      assert.strictEqual(typeof frontmatter, 'function');
    });

    it('`frontmatterRegex` should be defined', () => {
      assert.isDefined(frontmatterRegex);
      assert.instanceOf(frontmatterRegex, RegExp);
    });
  });
});
