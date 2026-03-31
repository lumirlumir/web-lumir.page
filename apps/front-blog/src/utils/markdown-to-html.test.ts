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
  describe('Markdown', () => {
    describe('should convert Markdown `inlineCode` syntax', () => {
      it('HTML에서 공백을 다루는 방법: `&nbsp;`, `&ensp;`, `&emsp;`', async () => {
        const markdown = 'HTML에서 공백을 다루는 방법: `&nbsp;`, `&ensp;`, `&emsp;`';
        const html = await markdownToHtml(markdown);
        const expectedHtml =
          '<p>HTML에서 공백을 다루는 방법: <code>&#x26;nbsp;</code>, <code>&#x26;ensp;</code>, <code>&#x26;emsp;</code></p>';

        strictEqual(html, expectedHtml);
      });
    });
  });

  describe('HTML', () => {
    describe('should preserve HTML `<sup>` tags', () => {
      it('마크다운<sup>Markdown</sup>의 모든 것', async () => {
        const markdown = '마크다운<sup>Markdown</sup>의 모든 것';
        const html = await markdownToHtml(markdown);
        const expectedHtml = '<p>마크다운<sup>Markdown</sup>의 모든 것</p>';

        strictEqual(html, expectedHtml);
      });
    });

    describe('should add `loading="lazy"` to `<img>` tags', () => {
      it('![alt](https://example.com/image.png)', async () => {
        const markdown = '![alt](https://example.com/image.png)';
        const html = await markdownToHtml(markdown);
        const expectedHtml =
          '<p><img src="https://example.com/image.png" alt="alt" loading="lazy"></p>';

        strictEqual(html, expectedHtml);
      });
    });

    describe('should replace image URLs starting with `/public`', () => {
      it('![alt](/public/image.png)', async () => {
        const markdown = '![alt](/public/image.png)';
        const html = await markdownToHtml(markdown);
        const expectedHtml = '<p><img src="/image.png" alt="alt" loading="lazy"></p>';

        strictEqual(html, expectedHtml);
      });
    });
  });
});
