import { type VMarkdownFile } from '@/data/v-markdown-file';
import { markdownToText } from './markup';

/* eslint-disable import/prefer-default-export */

/**
 * Use with an array of {@link MarkdownDocument} type.
 */
export function compareMarkdownDocument(
  sort: 'title' | 'created' | 'updated',
  order: 'asc' | 'desc',
) {
  switch (sort) {
    case 'title': {
      return function (a: VMarkdownFile, b: VMarkdownFile) {
        const titleA = markdownToText(a.data.title.toLowerCase()); // Case insensitive.
        const titleB = markdownToText(b.data.title.toLowerCase()); // Case insensitive.

        return order === 'asc'
          ? titleA.localeCompare(titleB, 'ko') // Ascending.
          : titleB.localeCompare(titleA, 'ko'); // Descending.
      };
    }
    case 'created':
    case 'updated': {
      return function (a: VMarkdownFile, b: VMarkdownFile) {
        const dateA = new Date(a.data[sort]);
        const dateB = new Date(b.data[sort]);

        // NaN check for invalid dates
        if (Number.isNaN(dateA) || Number.isNaN(dateB)) {
          throw new TypeError('Invalid date format.');
        }

        return order === 'asc'
          ? dateA - dateB // Ascending.
          : dateB - dateA; // Descending.
      };
    }
    default: {
      throw new TypeError('Invalid sort. Use "title", "created", or "updated".');
    }
  }
}
