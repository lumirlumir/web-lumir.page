/**
 * @fileoverview Defines file system helpers for markdown documents.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { readdir, readFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { frontmatter } from '@lumir/utils';
import { EXT_MD } from '@/constants';
import { type CategoryKey } from '@/data/category';
import { type Frontmatter } from '@/data/frontmatter';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const postsPath = join(process.cwd(), 'src', 'posts', 'docs');

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Asynchronously reads a directory and returns an array of `VMarkdownFileMeta` type objects.
 */
export async function readMarkdownFilesFromDir(): Promise<VMarkdownFileMeta[]> {
  const markdownFilePaths = (await readdir(postsPath)).filter(postPath =>
    postPath.endsWith(EXT_MD),
  );

  const markdownFiles = await Promise.all(
    markdownFilePaths.map(markdownFilePath =>
      readFile(join(postsPath, markdownFilePath), 'utf8'),
    ),
  );

  const markdownFileMetas = markdownFiles.map((markdownFile, index) => {
    const { data } = frontmatter(markdownFile);

    return {
      basename: basename(markdownFilePaths[index], EXT_MD),
      data: data as Frontmatter,
    };
  });

  return markdownFileMetas;
}

/**
 * Asynchronously reads a directory and generates a tag tree from markdown files.
 */
export async function readMarkdownTagTree(): Promise<
  Partial<Record<CategoryKey, VMarkdownFileMeta[]>>
> {
  const tagTree: Partial<Record<CategoryKey, VMarkdownFileMeta[]>> = {}; // Initialize an empty object to store the tag tree.
  const markdownDocuments = await readMarkdownFilesFromDir();

  for (const markdownDocument of markdownDocuments) {
    const {
      data: { tags },
    } = markdownDocument;

    tags.forEach(tag => {
      tagTree[tag] ??= [];
      tagTree[tag].push(markdownDocument);
    });
  }

  return tagTree;
}
