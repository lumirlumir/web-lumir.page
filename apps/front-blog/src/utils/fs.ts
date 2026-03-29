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
import { type VMarkdownFile } from '@/data/v-markdown-file';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Asynchronously reads a Markdown file and returns a `VMarkdownFile` type object.
 * @param pathToMarkdownFile The path to the Markdown file to read.
 */
export async function readMarkdownFile(pathToMarkdownFile: string) {
  const { content, data } = frontmatter(await readFile(pathToMarkdownFile, 'utf-8'));

  return {
    basename: basename(pathToMarkdownFile),
    content,
    data: data as Frontmatter,
  };
}

/**
 * Asynchronously reads a directory and returns an array of `VMarkdownFile` type objects.
 * @param dirPath The path to the directory containing Markdown files to read.
 */
export async function readMarkdownFilesFromDir(
  dirPath: string,
): Promise<VMarkdownFile[]> {
  const markdownFilePaths = (await readdir(dirPath)).filter(filePath =>
    filePath.endsWith(EXT_MD),
  );
  const markdownDocuments = await Promise.all(
    markdownFilePaths.map(markdownFilePath =>
      readMarkdownFile(join(dirPath, markdownFilePath)),
    ),
  );

  return markdownDocuments;
}

/**
 * Asynchronously reads a directory and generates a tag tree from markdown files.
 * @param dirPath The path to the directory containing Markdown files to read.
 */
export async function readMarkdownTagTree(
  dirPath: string,
): Promise<Partial<Record<CategoryKey, VMarkdownFile[]>>> {
  const tagTree: Partial<Record<CategoryKey, VMarkdownFile[]>> = {}; // Initialize an empty object to store the tag tree.
  const markdownDocuments = await readMarkdownFilesFromDir(dirPath);

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
