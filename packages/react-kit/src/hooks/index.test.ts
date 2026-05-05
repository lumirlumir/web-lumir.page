/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { useToggle, useTypewriter } from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`useToggle` should be defined', () => {
      assert.isDefined(useToggle);
      assert.strictEqual(typeof useToggle, 'function');
    });

    it('`useTypewriter` should be defined', () => {
      assert.isDefined(useTypewriter);
      assert.strictEqual(typeof useTypewriter, 'function');
    });
  });
});
