/**
 * @fileoverview Compares markdown documents.
 */

/* eslint-disable import/prefer-default-export */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type FrontmatterKeySortable } from '@/data/frontmatter';
import { type SortKey } from '@/data/sort';
import { type VMarkdownFile } from '@/data/v-markdown-file';
import { markdownToTextSync } from './markdown-to-text';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Returns a comparison function for sorting markdown documents based on the specified sort key and order.
 */
export function compareMarkdownDocument(sort: FrontmatterKeySortable, order: SortKey) {
  switch (sort) {
    case 'title': {
      return (a: VMarkdownFile, b: VMarkdownFile) => {
        const titleA = markdownToTextSync(a.data.title.toLowerCase()); // Case insensitive.
        const titleB = markdownToTextSync(b.data.title.toLowerCase()); // Case insensitive.

        return order === 'asc'
          ? titleA.localeCompare(titleB, 'ko') // Ascending.
          : titleB.localeCompare(titleA, 'ko'); // Descending.
      };
    }
    case 'created':
    case 'updated': {
      return (a: VMarkdownFile, b: VMarkdownFile) => {
        const dateA = new Date(a.data[sort]);
        const dateB = new Date(b.data[sort]);

        // NaN check for invalid dates
        if (Number.isNaN(dateA.getTime()) || Number.isNaN(dateB.getTime())) {
          throw new TypeError('Invalid date format.');
        }

        return order === 'asc'
          ? dateA.getTime() - dateB.getTime() // Ascending.
          : dateB.getTime() - dateA.getTime(); // Descending.
      };
    }
    default: {
      throw new TypeError('Invalid sort. Use "title", "created", or "updated".');
    }
  }
}
