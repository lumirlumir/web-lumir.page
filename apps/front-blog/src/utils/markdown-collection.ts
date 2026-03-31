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
 * Represents a collection of Markdown files, organized in three ways:
 * - `all`: an array of all Markdown file metadata
 * - `slug`: a record mapping each slug to its corresponding metadata for easy access
 * - `category`: a record mapping category keys to arrays of corresponding metadata
 */
export interface MarkdownCollection {
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
   *     },
   *     content: '# Example Post\n\nThis is the content of the example post.',
   *   },
   *   // ...more
   * ]
   * ```
   */
  readonly all: VMarkdownFile[];

  /**
   * A record mapping each slug to its corresponding metadata for easy access.
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
   *     },
   *     content: '# Example Post\n\nThis is the content of the example post.',
   *   },
   *   // ...more
   * }
   * ```
   */
  readonly slug: Record<string, VMarkdownFile>;

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
  readonly category: Record<CategoryKey, VMarkdownFile[]>;
}

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

  return {
    slug: key.replace(/^\.\//, '').replace(/\.md$/, ''),
    data: data as Frontmatter,
    content,
  };
});

const markdownCollectionAll: MarkdownCollection['all'] = vMarkdownFiles;
const markdownCollectionSlug: MarkdownCollection['slug'] = {};
const markdownCollectionCategory: MarkdownCollection['category'] = Object.fromEntries(
  categoryKeys.map(categoryKey => [categoryKey, [] as VMarkdownFile[]]),
) as MarkdownCollection['category'];

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

/**
 * A structured collection of Markdown files for easy access by list, slug, and category.
 */
export const markdownCollection: MarkdownCollection = {
  all: markdownCollectionAll,
  slug: markdownCollectionSlug,
  category: markdownCollectionCategory,
};

/**
 * Returns a list of category keys that have at least one associated Markdown file in the collection.
 */
export function listNonEmptyCategoryKeys(
  category: MarkdownCollection['category'],
): CategoryKey[] {
  return categoryKeys.filter(categoryKey => category[categoryKey].length > 0);
}
