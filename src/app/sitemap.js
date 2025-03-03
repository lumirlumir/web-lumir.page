/**
 * @fileoverview `sitemap.xml` generator for path `/`.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { WEBSITE_URL } from '@/constants';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default function sitemap() {
  return [
    {
      url: WEBSITE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
