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
      const result = frontMatter(
        '---\rtitle: Title\r\nauthor: Author\r---\rHello, world!',
      ); // Note: The YAML parser does not support CR line endings, so CR characters within YAML may not parse correctly.

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

    it('should handle empty YAML front matter as an empty data object', () => {
      const result = frontMatter('---\n---\nHello, world!');

      deepStrictEqual(result, {
        content: 'Hello, world!',
        data: {},
      });
    });
  });

  describe('when there is no front matter', () => {
    it('should return the original content and an empty data object', () => {
      const result = frontMatter('Hello, world!');

      deepStrictEqual(result, {
        content: 'Hello, world!',
        data: {},
      });
    });
  });
});
