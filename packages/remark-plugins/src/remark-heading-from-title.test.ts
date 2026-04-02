/**
 * @fileoverview Test for `remark-heading-from-title.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { remark } from 'remark';
import { assert, describe, it } from 'vitest';
import { remarkHeadingFromTitle } from './remark-heading-from-title.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('remark-heading-from-title', () => {
  describe('when the title is provided', () => {
    it('should prepend an h1 heading to the markdown document', async () => {
      const file = await remark()
        .use(remarkHeadingFromTitle, { title: 'lumir' })
        .process('paragraph');

      assert.strictEqual(file.value, '# lumir\n\nparagraph\n');
    });

    it('should preserve markdown syntax inside the title heading', async () => {
      const file = await remark()
        .use(remarkHeadingFromTitle, { title: '`lumir` **page**' })
        .process('paragraph');

      assert.strictEqual(file.value, '# `lumir` **page**\n\nparagraph\n');
    });
  });

  describe('when the title is empty', () => {
    it('should keep the original markdown content unchanged', async () => {
      const file = await remark()
        .use(remarkHeadingFromTitle, { title: '' })
        .process('paragraph');

      assert.strictEqual(file.value, 'paragraph\n');
    });
  });
});
