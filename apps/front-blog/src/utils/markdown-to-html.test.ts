/**
 * @fileoverview Test for `markdown-to-html.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { strictEqual } from 'node:assert';
import { describe, it } from 'vitest';
import { markdownToHtml } from './markdown-to-html.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-to-html', () => {
  describe('should preserve `<sup>` tags when converting Markdown to HTML', () => {
    it('마크다운<sup>Markdown</sup>의 모든 것', async () => {
      const markdown = '마크다운<sup>Markdown</sup>의 모든 것';
      const html = await markdownToHtml(markdown);
      const expectedHtml = '<p>마크다운<sup>Markdown</sup>의 모든 것</p>';

      strictEqual(html, expectedHtml);
    });
  });
});
