/**
 * @fileoverview Test for `frontmatter.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { frontmatter } from './frontmatter.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('frontmatter', () => {
  describe('when there is a front matter', () => {
    it('should handle empty YAML front matter as `null`', () => {
      const result = frontmatter('---\n---\nHello, world!');

      assert.deepStrictEqual(result, {
        content: 'Hello, world!',
        data: null,
      });
    });

    it('should handle front matter without content as an empty string', () => {
      const result = frontmatter('---\ntitle: Title\nauthor: Author\n---');

      assert.deepStrictEqual(result, {
        content: '',
        data: {
          title: 'Title',
          author: 'Author',
        },
      });
    });

    it('should parse CRLF front matter correctly', () => {
      const result = frontmatter(
        '---\r\ntitle: Title\r\nauthor: Author\r\n---\r\nHello, world!',
      );

      assert.deepStrictEqual(result, {
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
      const result = frontmatter(
        '---\rtitle: Title\r\nauthor: Author\r---\rHello, world!',
      );

      assert.deepStrictEqual(result, {
        content: 'Hello, world!',
        data: {
          title: 'Title',
          author: 'Author',
        },
      });
    });

    it('should parse LF front matter correctly', () => {
      const result = frontmatter('---\ntitle: Title\nauthor: Author\n---\nHello, world!');

      assert.deepStrictEqual(result, {
        content: 'Hello, world!',
        data: {
          title: 'Title',
          author: 'Author',
        },
      });
    });

    it('should parse front matter with emojis correctly', () => {
      const result = frontmatter(
        '---\ntitle: "Title with emoji 😊"\nauthor: "Author with emoji 😎"\n---\nHello, world!',
      );

      assert.deepStrictEqual(result, {
        content: 'Hello, world!',
        data: {
          title: 'Title with emoji 😊',
          author: 'Author with emoji 😎',
        },
      });
    });

    it('should handle front matter with a numeric value', () => {
      const result = frontmatter('---\n1\n---\nHello, world!');

      assert.deepStrictEqual(result, {
        content: 'Hello, world!',
        data: 1,
      });
    });

    it('should handle front matter with an array value', () => {
      const result = frontmatter('---\n[1, 2, 3]\n---\nHello, world!');

      assert.deepStrictEqual(result, {
        content: 'Hello, world!',
        data: [1, 2, 3],
      });
    });
  });

  describe('when there is no front matter', () => {
    it('should return the original content and `null` data', () => {
      const result = frontmatter('Hello, world!');

      assert.deepStrictEqual(result, {
        content: 'Hello, world!',
        data: null,
      });
    });
  });
});
