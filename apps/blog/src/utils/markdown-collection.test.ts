/**
 * @fileoverview Test for `markdown-collection.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import createMarkdownCollection from './markdown-collection.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-collection', () => {
  it('should reuse the same instance', () => {
    const markdownCollection1 = createMarkdownCollection();
    const markdownCollection2 = createMarkdownCollection();

    assert.strictEqual(markdownCollection1, markdownCollection2);
  });
});
