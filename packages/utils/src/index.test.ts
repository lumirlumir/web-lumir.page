/**
 * @fileoverview Test for `index.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import * as indexModule from './index.js';
import { cn } from './cn.js';
import { frontmatter, frontmatterRegex } from './frontmatter.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('index', () => {
  it('should re-export `cn`, `frontmatter`, and `frontmatterRegex`', () => {
    assert.deepStrictEqual(Object.keys(indexModule).sort(), [
      'cn',
      'frontmatter',
      'frontmatterRegex',
    ]);
    assert.strictEqual(indexModule.cn, cn);
    assert.strictEqual(indexModule.frontmatter, frontmatter);
    assert.strictEqual(indexModule.frontmatterRegex, frontmatterRegex);
  });
});
