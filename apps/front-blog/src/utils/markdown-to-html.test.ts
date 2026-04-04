/**
 * @fileoverview Test for `markdown-to-html.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { markdownToHtml } from './markdown-to-html.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('markdown-to-html', () => {
  describe('Markdown', () => {
    it('should convert plain text - 1', async () => {
      const markdown = '한글 유니코드(Unicode)';
      const html = '<p>한글 유니코드(Unicode)</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert plain text - 2', async () => {
      const markdown = "GitHub's classic branch protection rules";
      const html = "<p>GitHub's classic branch protection rules</p>";

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert plain text - 3', async () => {
      const markdown =
        'Next.js에서 File-based Metadata를 이용할 때, Favicon이 정상적으로 반영되지 않는 현상';
      const html =
        '<p>Next.js에서 File-based Metadata를 이용할 때, Favicon이 정상적으로 반영되지 않는 현상</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert Markdown `inlineCode` syntax - 1', async () => {
      const markdown = 'HTML에서 공백을 다루는 방법: `&nbsp;`, `&ensp;`, `&emsp;`';
      const html =
        '<p>HTML에서 공백을 다루는 방법: <code>&#x26;nbsp;</code>, <code>&#x26;ensp;</code>, <code>&#x26;emsp;</code></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert Markdown `inlineCode` syntax - 2', async () => {
      const markdown =
        '자바스크립트 CommonJS 및 ES 모듈 내보내기/불러오기 (`require` 및 `import`)';
      const html =
        '<p>자바스크립트 CommonJS 및 ES 모듈 내보내기/불러오기 (<code>require</code> 및 <code>import</code>)</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert Markdown `inlineCode` syntax with HTML tags', async () => {
      const markdown = '`<b>` `<i>` ***Tag***와 `<strong>` `<em>` ***Tag***의 차이점';
      const html =
        '<p><code>&#x3C;b></code> <code>&#x3C;i></code> <em><strong>Tag</strong></em>와 <code>&#x3C;strong></code> <code>&#x3C;em></code> <em><strong>Tag</strong></em>의 차이점</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should convert Markdown `strong` and `emphasis` syntax', async () => {
      const markdown = '자바스크립트(***JavaScript***)의 구성';
      const html = '<p>자바스크립트(<em><strong>JavaScript</strong></em>)의 구성</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });
  });

  describe('HTML', () => {
    it('should preserve HTML `<sup>` tags', async () => {
      const markdown = '마크다운<sup>Markdown</sup>의 모든 것';
      const html = '<p>마크다운<sup>Markdown</sup>의 모든 것</p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should add `loading="lazy"` to `<img>` tags', async () => {
      const markdown = '![alt](https://example.com/image.png)';
      const html =
        '<p><img src="https://example.com/image.png" alt="alt" loading="lazy"></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });

    it('should replace image URLs starting with `/apps/front-blog/public`', async () => {
      const markdown = '![alt](/apps/front-blog/public/image.png)';
      const html = '<p><img src="/image.png" alt="alt" loading="lazy"></p>';

      assert.strictEqual(await markdownToHtml(markdown), html);
    });
  });
});
