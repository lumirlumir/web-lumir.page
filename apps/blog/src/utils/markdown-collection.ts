/**
 * @fileoverview Defines a structured collection of Markdown files organized by `all`, `slug`, and `category`.
 * @see https://webpack.js.org/guides/dependency-management/#importmetawebpackcontext
 * @see https://webpack.js.org/api/module-variables/#importmetawebpackcontext
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { frontmatter } from '@lumir/utils';
import { categoryKeys, type CategoryKey } from '@/data/category';
import { type Frontmatter } from '@/data/frontmatter';
import { type VMarkdownFile } from '@/data/v-markdown-file';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * An array containing the metadata of all Markdown files in the collection.
 *
 * @example
 * ```ts
 * [
 *   {
 *     slug: 'example-post',
 *     data: {
 *       title: 'Example Post',
 *       description: 'This is an example post.',
 *       created: '2024-01-01',
 *       updated: '2024-01-02',
 *       categories: ['tech', 'news'],
 *       references: ['https://example.com'],
 *     },
 *     content: '# Example Post\n\nThis is the content of the example post.',
 *   },
 *   // ...more
 * ]
 * ```
 */
export type MarkdownCollectionAll = readonly VMarkdownFile[];

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
 *       categories: ['tech', 'news'],
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
 *   tech: [
 *     {
 *       slug: 'example-post',
 *       data: {
 *         title: 'Example Post',
 *         description: 'This is an example post.',
 *         created: '2024-01-01',
 *         updated: '2024-01-02',
 *         categories: ['tech', 'news'],
 *         references: ['https://example.com'],
 *       },
 *       content: '# Example Post\n\nThis is the content of the example post.',
 *     },
 *     // ...more
 *   ],
 *   news: [
 *     {
 *       slug: 'example-post',
 *       data: {
 *         title: 'Example Post',
 *         description: 'This is an example post.',
 *         created: '2024-01-01',
 *         updated: '2024-01-02',
 *         categories: ['tech', 'news'],
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

const context = import.meta.webpackContext('../posts/docs', {
  recursive: false,
  regExp: /\.md$/,
  mode: 'sync',
});

const vMarkdownFiles: VMarkdownFile[] = context.keys().map(key => {
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

  return {
    slug: key.replace(/^\.\//, '').replace(/\.md$/, ''),
    data,
    content,
  };
});

/**
 * An array containing the metadata of all Markdown files in the collection.
 *
 * @example
 * ```ts
 * [
 *   {
 *     slug: 'example-post',
 *     data: {
 *       title: 'Example Post',
 *       description: 'This is an example post.',
 *       created: '2024-01-01',
 *       updated: '2024-01-02',
 *       categories: ['tech', 'news'],
 *       references: ['https://example.com'],
 *     },
 *     content: '# Example Post\n\nThis is the content of the example post.',
 *   },
 *   // ...more
 * ]
 * ```
 */
const markdownCollectionAll: MarkdownCollectionAll = vMarkdownFiles;

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
 *       categories: ['tech', 'news'],
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
 *   tech: [
 *     {
 *       slug: 'example-post',
 *       data: {
 *         title: 'Example Post',
 *         description: 'This is an example post.',
 *         created: '2024-01-01',
 *         updated: '2024-01-02',
 *         categories: ['tech', 'news'],
 *       },
 *       content: '# Example Post\n\nThis is the content of the example post.',
 *     },
 *     // ...more
 *   ],
 *   news: [
 *     {
 *       slug: 'example-post',
 *       data: {
 *         title: 'Example Post',
 *         description: 'This is an example post.',
 *         created: '2024-01-01',
 *         updated: '2024-01-02',
 *         categories: ['tech', 'news'],
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

/**
 * Type guard to check if the given data conforms to the `Frontmatter` interface.
 * @param data The data to check for conformity to the `Frontmatter` interface.
 */
function isFrontmatter(data: unknown): data is Frontmatter {
  return (
    // check `object`
    typeof data === 'object' &&
    data !== null &&
    // check `title`
    'title' in data &&
    typeof data.title === 'string' &&
    // check `description`
    'description' in data &&
    typeof data.description === 'string' &&
    // check `created`
    'created' in data &&
    typeof data.created === 'string' &&
    // check `updated`
    'updated' in data &&
    typeof data.updated === 'string' &&
    // check `categories`
    'categories' in data &&
    Array.isArray(data.categories) &&
    data.categories.every(category => categoryKeys.includes(category)) &&
    // check `references`
    'references' in data &&
    Array.isArray(data.references) &&
    data.references.every(reference => typeof reference === 'string')
  );
}

// --------------------------------------------------------------------------------
// Load and Organize Markdown Files
// --------------------------------------------------------------------------------

vMarkdownFiles.forEach(vMarkdownFile => {
  const { categories } = vMarkdownFile.data;

  // `markdownCollectionSlug`
  markdownCollectionSlug[vMarkdownFile.slug] = vMarkdownFile;
  // `markdownCollectionCategory`
  categories.forEach(category => {
    markdownCollectionCategory[category] ??= [];
    markdownCollectionCategory[category].push(vMarkdownFile);
  });
});

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export { markdownCollectionAll, markdownCollectionSlug, markdownCollectionCategory };

/**
 * Returns a list of category keys that have at least one associated Markdown file in the collection.
 * @param category The `MarkdownCollectionCategory` to check for non-empty categories.
 */
export function listNonEmptyCategoryKeys(
  category: MarkdownCollectionCategory,
): CategoryKey[] {
  return categoryKeys.filter(categoryKey => category[categoryKey].length > 0);
}
