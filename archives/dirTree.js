// @ts-check
import { promises as fs } from 'fs';
import { join } from 'path';

/**
 * @typedef DirTreeNode
 * @property {string} name
 * @property {DirTreeNode[]} [children]
 */

/**
 * Asynchronously retrieves the directory tree structure.
 *
 * @async
 * @param {string} dirPath The path of the directory.
 * @returns {Promise<DirTreeNode[]>} A promise that resolves to an array of `DirTreeNode`.
 * @example
 * // Read the directory tree structure
 * const dirTree = await readDirTree('/path/to/dir');
 * console.log(dirTree);
 */
export async function readDirTree(dirPath) {
  // `readdir` automatically throws an error when `dirPath` is not a directory.
  const dirents = await fs.readdir(dirPath, { withFileTypes: true });

  return await Promise.all(
    dirents.map(async dirent => ({
      name: dirent.name,
      ...(dirent.isDirectory()
        ? { children: await readDirTree(join(dirPath, dirent.name)) }
        : {}),
    })),
  );
}

/**
 * Checks if a `DirTreeNode` is a directory.
 *
 * @param {DirTreeNode} dirTreeNode The `DirTreeNode` object.
 * @returns {boolean} `true` if the node is a directory. otherwise, `false`.
 * @example
 * // Check if a node is a directory
 * const isDir = isDir({ name: 'folder', children: [...] });
 * console.log(isDir); // true
 */
export function isDir(dirTreeNode) {
  return Boolean(dirTreeNode.children);
}
