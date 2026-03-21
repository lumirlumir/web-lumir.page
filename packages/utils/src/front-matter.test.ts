/**
 * @fileoverview Test for `front-matter.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'vitest';
import { frontMatter } from './front-matter.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('front-matter', () => {
  describe('when there is a front matter', () => {
    it('should handle empty YAML front matter as `null`', () => {
      const result = frontMatter('---\n---\nHello, world!');

      deepStrictEqual(result, {
        content: 'Hello, world!',
        data: null,
      });
    });

    it('should handle front matter without content as an empty string', () => {
      const result = frontMatter('---\ntitle: Title\nauthor: Author\n---');

      deepStrictEqual(result, {
        content: '',
        data: {
          title: 'Title',
          author: 'Author',
        },
      });
    });

    it('should parse CRLF front matter correctly', () => {
      const result = frontMatter(
        '---\r\ntitle: Title\r\nauthor: Author\r\n---\r\nHello, world!',
      );

      deepStrictEqual(result, {
        content: 'Hello, world!',
        data: {
          title: 'Title',
          author: 'Author',
        },
      });
    });

    it('should parse CR front matter correctly', () => {
      // Note: The YAML parser does not support CR line endings, so CR characters within YAML may not parse correctly.
      // This test intentionally mixes CR and CRLF line endings to verify parsing behavior.
      const result = frontMatter(
        '---\rtitle: Title\r\nauthor: Author\r---\rHello, world!',
      );

      deepStrictEqual(result, {
        content: 'Hello, world!',
        data: {
          title: 'Title',
          author: 'Author',
        },
      });
    });

    it('should parse LF front matter correctly', () => {
      const result = frontMatter('---\ntitle: Title\nauthor: Author\n---\nHello, world!');

      deepStrictEqual(result, {
        content: 'Hello, world!',
        data: {
          title: 'Title',
          author: 'Author',
        },
      });
    });

    it('should parse front matter with emojis correctly', () => {
      const result = frontMatter(
        '---\ntitle: "Title with emoji 😊"\nauthor: "Author with emoji 😎"\n---\nHello, world!',
      );

      deepStrictEqual(result, {
        content: 'Hello, world!',
        data: {
          title: 'Title with emoji 😊',
          author: 'Author with emoji 😎',
        },
      });
    });

    it('should handle front matter with a numeric value', () => {
      const result = frontMatter('---\n1\n---\nHello, world!');

      deepStrictEqual(result, {
        content: 'Hello, world!',
        data: 1,
      });
    });

    it('should handle front matter with an array value', () => {
      const result = frontMatter('---\n[1, 2, 3]\n---\nHello, world!');

      deepStrictEqual(result, {
        content: 'Hello, world!',
        data: [1, 2, 3],
      });
    });
  });

  describe('when there is no front matter', () => {
    it('should return the original content and `null` data', () => {
      const result = frontMatter('Hello, world!');

      deepStrictEqual(result, {
        content: 'Hello, world!',
        data: null,
      });
    });
  });
});
