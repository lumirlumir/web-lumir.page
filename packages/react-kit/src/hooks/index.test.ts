/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import * as indexModule from './index.js';
import { useToggle } from './use-toggle.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  it('should re-export `useToggle`', () => {
    assert.deepStrictEqual(Object.keys(indexModule), ['useToggle']);
    assert.strictEqual(indexModule.useToggle, useToggle);
  });
});
