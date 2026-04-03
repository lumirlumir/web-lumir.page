/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { useToggle } from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`useToggle` should be defined', () => {
      assert.isDefined(useToggle);
      assert.strictEqual(typeof useToggle, 'function');
    });
  });
});
