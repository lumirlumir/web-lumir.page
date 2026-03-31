/**
 * @fileoverview Defines the helper functions for loading and organizing Markdown files into a structured collection.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { readdir, readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { frontmatter } from '@lumir/utils';
import { EXT_MD } from '@/constants';
import { categoryKeys, type CategoryKey } from '@/data/category';
import { type Frontmatter } from '@/data/frontmatter';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents a collection of Markdown files, organized in two ways:
 * - `all` (an array of all Markdown file metadata)
 * - `category` (a record mapping category keys to arrays of corresponding metadata)
 */
export interface MarkdownCollection {
  /**
   * An array containing the metadata of all Markdown files in the collection.
   */
  readonly all: VMarkdownFileMeta[];

  /**
   * A record mapping each category key to an array of metadata for Markdown files that belong to that category.
   */
  readonly category: Record<CategoryKey, VMarkdownFileMeta[]>;
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Path to the directory containing the Markdown files for posts.
 */
const postsPath = join(process.cwd(), 'src', 'posts', 'docs');

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Loads the collection of Markdown files from the file system and organizes them into a structured format for easy access.
 */
export async function loadMarkdownCollection(): Promise<MarkdownCollection> {
  // Initialize empty structures to store the collection data.
  const markdownCollectionAll: MarkdownCollection['all'] = [];
  const markdownCollectionCategory: MarkdownCollection['category'] = Object.fromEntries(
    categoryKeys.map(categoryKey => [categoryKey, [] as VMarkdownFileMeta[]]),
  ) as MarkdownCollection['category'];

  // Read all file paths in the posts directory.
  const filePaths = await readdir(postsPath);
  const markdownFilePaths = filePaths.filter(filePath => filePath.endsWith(EXT_MD));

  await Promise.all(
    markdownFilePaths.map(markdownFilePath =>
      readFile(join(postsPath, markdownFilePath), 'utf8').then(content => {
        const { data } = frontmatter(content);
        const { categories } = data as Frontmatter;

        const vMarkdownFileMeta: VMarkdownFileMeta = {
          slug: basename(markdownFilePath, EXT_MD),
          data: data as Frontmatter,
        };

        // `all`
        markdownCollectionAll.push(vMarkdownFileMeta);
        // `category`
        categories.forEach(category => {
          markdownCollectionCategory[category] ??= [];
          markdownCollectionCategory[category].push(vMarkdownFileMeta);
        });
      }),
    ),
  );

  return {
    all: markdownCollectionAll,
    category: markdownCollectionCategory,
  };
}

/**
 * Returns a list of category keys that have at least one associated Markdown file in the collection.
 */
export function listNonEmptyCategoryKeys(
  markdownCollectionCategory: MarkdownCollection['category'],
): CategoryKey[] {
  return categoryKeys.filter(
    categoryKey => markdownCollectionCategory[categoryKey].length > 0,
  );
}
