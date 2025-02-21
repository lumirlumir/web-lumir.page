import { markdownToText } from './markup';

/**
 * @typedef {import('@/types').MarkdownDocument} MarkdownDocument
 */

/**
 * Use with an array of {@link MarkdownDocument} type.
 *
 * @param {'title' | 'created' | 'updated'} sort `'title'`, `'created'` or `'updated'` can be used.
 * @param {'asc' | 'desc'} order `'asc'` or `'desc'` can be used.
 * @returns {function} A comparison function for use with `Array.prototype.sort`.
 */
export function compareMarkdownDocument(sort, order) {
  switch (sort) {
    case 'title': {
      return function (a, b) {
        const titleA = markdownToText(a.data.title.toLowerCase()); // Case insensitive.
        const titleB = markdownToText(b.data.title.toLowerCase()); // Case insensitive.

        return order === 'asc'
          ? titleA.localeCompare(titleB, 'ko') // Ascending.
          : titleB.localeCompare(titleA, 'ko'); // Descending.
      };
    }
    case 'created':
    case 'updated': {
      return function (a, b) {
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
