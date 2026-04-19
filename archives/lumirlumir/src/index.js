/**
 * @fileoverview Entry file for `build` and `watch` commands.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { contributions } from './data/index.js';
import { generateContributions } from './generators/index.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

/** @param {string} markdownFileName @param {string} markdownContent */
function writeMarkdownFile(markdownFileName, markdownContent) {
  return writeFileSync(resolve(process.cwd(), 'docs', markdownFileName), markdownContent);
}

// --------------------------------------------------------------------------------
// Script
// --------------------------------------------------------------------------------

writeMarkdownFile('contributions.md', generateContributions(contributions));
