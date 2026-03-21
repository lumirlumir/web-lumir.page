/**
 * @fileoverview front-matter.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import yaml from 'yaml';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Front matter regex pattern to match YAML front matter at the beginning of a string.
 * Line endings can be CRLF (`\r\n`), CR (`\r`), or LF (`\n`) as per CommonMark specification.
 * @see https://spec.commonmark.org/0.31.2/#line-ending
 */
export const frontMatterRegex =
  /^---(?:\r\n|[\r\n])(?:(?<yaml>[\s\S]*?)(?:\r\n|[\r\n]))?---(?:\r\n|[\r\n]|$)/;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Parses the front matter from a string and returns the content without the front matter and the parsed data.
 * If no front matter is found, it returns the original content and `null` data.
 * @example
 *
 * ```ts
 * import { frontMatter } from '@lumir/utils';
 *
 * const result = frontMatter(`---\ntitle: Title\nauthor: Author\n---\nHello, world!`);
 *
 * console.log(result);
 * // {
 * //   content: 'Hello, world!',
 * //   data: {
 * //     title: 'Title',
 * //     author: 'Author',
 * //   },
 * // }
 * ```
 */
export function frontMatter(input: string): {
  content: string;
  data: unknown;
} {
  const match = input.match(frontMatterRegex);

  if (!match) {
    return {
      content: input,
      data: null,
    };
  }

  return {
    content: input.slice(match[0].length),
    data: yaml.parse(match.groups?.yaml ?? ''),
  };
}
