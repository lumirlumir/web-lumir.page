/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { SVGWrapper } from './index.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  describe('exports', () => {
    it('`SVGWrapper` should be defined', () => {
      assert.isDefined(SVGWrapper);
      assert.strictEqual(typeof SVGWrapper, 'function');
    });
  });
});
