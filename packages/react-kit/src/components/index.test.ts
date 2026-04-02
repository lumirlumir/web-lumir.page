/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import * as indexModule from './index.js';
import { SVGWrapper } from './svg-wrapper.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  it('should re-export `SVGWrapper`', () => {
    assert.deepStrictEqual(Object.keys(indexModule), ['SVGWrapper']);
    assert.strictEqual(indexModule.SVGWrapper, SVGWrapper);
  });
});
