/**
 * @fileoverview Test for `frontmatter.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { frontmatter, frontmatterData } from './frontmatter.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('frontmatter', () => {
  describe('when there is a front matter', () => {
    it('should handle empty YAML front matter as `null`', () => {
      const input = '---\n---\nHello, world!';
      const expected = {
        content: 'Hello, world!',
        data: null,
      };

      assert.deepStrictEqual(frontmatter(input), expected);
      assert.deepStrictEqual(frontmatterData(input), {
        data: expected.data,
      });
    });

    it('should handle front matter without content as an empty string', () => {
      const input = '---\ntitle: Title\nauthor: Author\n---';
      const expected = {
        content: '',
        data: {
          title: 'Title',
          author: 'Author',
        },
      };

      assert.deepStrictEqual(frontmatter(input), expected);
      assert.deepStrictEqual(frontmatterData(input), {
        data: expected.data,
      });
    });

    it('should parse CRLF front matter correctly', () => {
      const input = '---\r\ntitle: Title\r\nauthor: Author\r\n---\r\nHello, world!';
      const expected = {
        content: 'Hello, world!',
        data: {
          title: 'Title',
          author: 'Author',
        },
      };

      assert.deepStrictEqual(frontmatter(input), expected);
      assert.deepStrictEqual(frontmatterData(input), {
        data: expected.data,
      });
    });

    it('should parse CR front matter correctly', () => {
      // Note: The YAML parser does not support CR line endings, so CR characters within YAML may not parse correctly.
      // This test intentionally mixes CR and CRLF line endings to verify parsing behavior.
      const input = '---\rtitle: Title\r\nauthor: Author\r---\rHello, world!';
      const expected = {
        content: 'Hello, world!',
        data: {
          title: 'Title',
          author: 'Author',
        },
      };

      assert.deepStrictEqual(frontmatter(input), expected);
      assert.deepStrictEqual(frontmatterData(input), {
        data: expected.data,
      });
    });

    it('should parse LF front matter correctly', () => {
      const input = '---\ntitle: Title\nauthor: Author\n---\nHello, world!';
      const expected = {
        content: 'Hello, world!',
        data: {
          title: 'Title',
          author: 'Author',
        },
      };

      assert.deepStrictEqual(frontmatter(input), expected);
      assert.deepStrictEqual(frontmatterData(input), {
        data: expected.data,
      });
    });

    it('should parse front matter with emojis correctly', () => {
      const input =
        '---\ntitle: "Title with emoji 😊"\nauthor: "Author with emoji 😎"\n---\nHello, world!';
      const expected = {
        content: 'Hello, world!',
        data: {
          title: 'Title with emoji 😊',
          author: 'Author with emoji 😎',
        },
      };

      assert.deepStrictEqual(frontmatter(input), expected);
      assert.deepStrictEqual(frontmatterData(input), {
        data: expected.data,
      });
    });

    it('should handle front matter with a numeric value', () => {
      const input = '---\n1\n---\nHello, world!';
      const expected = {
        content: 'Hello, world!',
        data: 1,
      };

      assert.deepStrictEqual(frontmatter(input), expected);
      assert.deepStrictEqual(frontmatterData(input), {
        data: expected.data,
      });
    });

    it('should handle front matter with an array value', () => {
      const input = '---\n[1, 2, 3]\n---\nHello, world!';
      const expected = {
        content: 'Hello, world!',
        data: [1, 2, 3],
      };

      assert.deepStrictEqual(frontmatter(input), expected);
      assert.deepStrictEqual(frontmatterData(input), {
        data: expected.data,
      });
    });
  });

  describe('when there is no front matter', () => {
    it('should return the original content and `null` data', () => {
      const input = 'Hello, world!';
      const expected = {
        content: 'Hello, world!',
        data: null,
      };

      assert.deepStrictEqual(frontmatter(input), expected);
      assert.deepStrictEqual(frontmatterData(input), {
        data: expected.data,
      });
    });
  });
});
