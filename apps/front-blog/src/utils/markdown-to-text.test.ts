/**
 * @fileoverview Test for `markdown-to-text.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { strictEqual } from 'node:assert';
import { describe, it } from 'vitest';
import { markdownToText } from './markdown-to-text.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-to-text', () => {
  describe('should convert Markdown `inlineCode` syntax', async () => {
    it('HTML에서 공백을 다루는 방법: `&nbsp;`, `&ensp;`, `&emsp;`', async () => {
      const markdown = 'HTML에서 공백을 다루는 방법: `&nbsp;`, `&ensp;`, `&emsp;`';
      const text = await markdownToText(markdown);
      const expectedText = 'HTML에서 공백을 다루는 방법: \\&nbsp;, \\&ensp;, \\&emsp;';

      strictEqual(text, expectedText);
    });

    it('`<b>` `<i>` ***Tag***와 `<strong>` `<em>` ***Tag***의 차이점', async () => {
      const markdown = '`<b>` `<i>` ***Tag***와 `<strong>` `<em>` ***Tag***의 차이점';
      const text = await markdownToText(markdown);
      const expectedText = '\\<b> \\<i> Tag와 \\<strong> \\<em> Tag의 차이점';

      strictEqual(text, expectedText);
    });
  });
});
