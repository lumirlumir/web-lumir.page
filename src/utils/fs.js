import { promises as fs } from 'node:fs';
import { basename, join } from 'node:path';

import matter from 'gray-matter';

import { EXT_MD } from '@/constants';

/**
 * @typedef {import('@/types').MarkdownDocument} MarkdownDocument
 */

/**
 * Asynchronously reads a Markdown file and returns a `MarkdownDocument` type object.
 *
 * @async
 * @param {string} pathToMarkdownFile Path to a Markdown file.
 * @returns {Promise<MarkdownDocument>} A promise that resolves to a `MarkdownDocument` type object.
 * @see {@link MarkdownDocument}
 */
export async function readMarkdownFile(pathToMarkdownFile) {
  const { content, data } = matter(await fs.readFile(pathToMarkdownFile, 'utf-8'));

  return {
    basename: basename(pathToMarkdownFile),
    content,
    data,
  };
}

/**
 * Asynchronously reads a directory and returns a list(array) of `MarkdownDocument` type object.
 *
 * @async
 * @param {string} dirPath Path to a directory containing markdown files.
 * @returns {Promise<MarkdownDocument[]>} A promise that resolves to a list(array) of `MarkdownDocument` type object.
 * @see {@link MarkdownDocument}
 */
export async function readMarkdownFilesFromDir(dirPath) {
  const markdownDocuments = [];
  const markdownFilePaths = (await fs.readdir(dirPath)).filter(filePath =>
    filePath.endsWith(EXT_MD),
  );

  for (const markdownFilePath of markdownFilePaths) {
    const markdownDocument = await readMarkdownFile(join(dirPath, markdownFilePath)); // eslint-disable-line no-await-in-loop -- TODO: Delete it later.
    markdownDocuments.push(markdownDocument);
  }

  return markdownDocuments;
}

/**
 * Asynchronously reads a directory and generates a tag tree from markdown files.
 *
 * @async
 * @param {string} dirPath Path to a directory containing markdown files.
 * @returns {Promise<{[key: string]: MarkdownDocument[]}>} A promise that resolves to a tag tree.
 * @see {@link MarkdownDocument}
 */
export async function readMarkdownTagTree(dirPath) {
  const tagTree = {}; // Initialize an empty object to store the tag tree.
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
