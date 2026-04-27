/**
 * @fileoverview Defines a structured collection of Markdown files organized by `slug` and `category`.
 * @see https://webpack.js.org/guides/dependency-management/#importmetawebpackcontext
 * @see https://webpack.js.org/api/module-variables/#importmetawebpackcontext
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { frontmatter } from '@lumir/utils';
import { categoryKeys, type CategoryKey } from '@/data/category';
import { type VMarkdownFile } from '@/data/v-markdown-file';
import { isFrontmatter } from '@/utils/is-frontmatter';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * A record mapping each slug to its corresponding metadata.
 *
 * @example
 * ```ts
 * {
 *   'example-post': {
 *     slug: 'example-post',
 *     data: {
 *       title: 'Example Post',
 *       description: 'This is an example post.',
 *       created: '2024-01-01',
 *       updated: '2024-01-02',
 *       categories: ['javascript', 'markdown'],
 *       references: ['https://example.com'],
 *     },
 *     content: '# Example Post\n\nThis is the content of the example post.',
 *   },
 *   // ...more
 * }
 * ```
 */
export type MarkdownCollectionSlug = Record<string, VMarkdownFile>;

/**
 * A record mapping each category key to an array of metadata for Markdown files that belong to that category.
 *
 * @example
 * ```ts
 * {
 *   javascript: [
 *     {
 *       slug: 'example-post',
 *       data: {
 *         title: 'Example Post',
 *         description: 'This is an example post.',
 *         created: '2024-01-01',
 *         updated: '2024-01-02',
 *         categories: ['javascript', 'markdown'],
 *         references: ['https://example.com'],
 *       },
 *       content: '# Example Post\n\nThis is the content of the example post.',
 *     },
 *     // ...more
 *   ],
 *   markdown: [
 *     {
 *       slug: 'example-post',
 *       data: {
 *         title: 'Example Post',
 *         description: 'This is an example post.',
 *         created: '2024-01-01',
 *         updated: '2024-01-02',
 *         categories: ['javascript', 'markdown'],
 *         references: ['https://example.com'],
 *       },
 *       content: '# Example Post\n\nThis is the content of the example post.',
 *     },
 *     // ...more
 *   ],
 *   // ...more
 * }
 * ```
 */
export type MarkdownCollectionCategory = Record<CategoryKey, VMarkdownFile[]>;

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * A record mapping each slug to its corresponding metadata.
 *
 * @example
 * ```ts
 * {
 *   'example-post': {
 *     slug: 'example-post',
 *     data: {
 *       title: 'Example Post',
 *       description: 'This is an example post.',
 *       created: '2024-01-01',
 *       updated: '2024-01-02',
 *       categories: ['javascript', 'markdown'],
 *       references: ['https://example.com'],
 *     },
 *     content: '# Example Post\n\nThis is the content of the example post.',
 *   },
 *   // ...more
 * }
 * ```
 */
const markdownCollectionSlug: MarkdownCollectionSlug = {};

/**
 * A record mapping each category key to an array of metadata for Markdown files that belong to that category.
 *
 * @example
 * ```ts
 * {
 *   javascript: [
 *     {
 *       slug: 'example-post',
 *       data: {
 *         title: 'Example Post',
 *         description: 'This is an example post.',
 *         created: '2024-01-01',
 *         updated: '2024-01-02',
 *         categories: ['javascript', 'markdown'],
 *       },
 *       content: '# Example Post\n\nThis is the content of the example post.',
 *     },
 *     // ...more
 *   ],
 *   markdown: [
 *     {
 *       slug: 'example-post',
 *       data: {
 *         title: 'Example Post',
 *         description: 'This is an example post.',
 *         created: '2024-01-01',
 *         updated: '2024-01-02',
 *         categories: ['javascript', 'markdown'],
 *       },
 *       content: '# Example Post\n\nThis is the content of the example post.',
 *     },
 *     // ...more
 *   ],
 *   // ...more
 * }
 * ```
 */
const markdownCollectionCategory: MarkdownCollectionCategory = Object.fromEntries(
  categoryKeys.map(categoryKey => [categoryKey, [] as VMarkdownFile[]]),
) as MarkdownCollectionCategory;

// --------------------------------------------------------------------------------
// Load and Organize Markdown Files
// --------------------------------------------------------------------------------

const context = import.meta.webpackContext('../posts/docs', {
  recursive: false,
  regExp: /\.md$/,
  mode: 'sync',
});

context.keys().forEach(key => {
  const { data, content } = frontmatter(context(key));

  if (!isFrontmatter(data)) {
    throw new Error(
      `
Invalid frontmatter in Markdown file: \`${key}\`

Expected frontmatter format:
  - \`title: string\`
  - \`description: string\`
  - \`created: string\`
  - \`updated: string\`
  - \`categories: CategoryKey[]\`
  - \`references: string[]\`

Received data: \`${JSON.stringify(data, null, 2)}\`
`,
    );
  }

  const vMarkdownFile: VMarkdownFile = {
    slug: key.replace(/^\.\//, '').replace(/\.md$/, ''),
    data,
    content,
  };

  // `markdownCollectionSlug`
  markdownCollectionSlug[vMarkdownFile.slug] = vMarkdownFile;
  // `markdownCollectionCategory`
  data.categories.forEach(category => {
    markdownCollectionCategory[category].push(vMarkdownFile);
  });
});

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export { markdownCollectionSlug, markdownCollectionCategory };

/**
 * Returns a list of category keys that have at least one associated Markdown file in the collection.
 * @param category The `MarkdownCollectionCategory` to check for non-empty categories.
 * @example
 * ```ts
 * import { listNonEmptyCategoryKeys, markdownCollectionCategory } from '@/utils/markdown-collection';
 *
 * const nonEmptyCategories = listNonEmptyCategoryKeys(markdownCollectionCategory);
 * console.log(nonEmptyCategories); // Output: ['javascript', 'markdown']
 * ```
 */
export function listNonEmptyCategoryKeys(
  category: MarkdownCollectionCategory,
): CategoryKey[] {
  return categoryKeys.filter(categoryKey => category[categoryKey].length > 0);
}
