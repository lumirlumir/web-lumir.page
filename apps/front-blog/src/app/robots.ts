/**
 * @fileoverview `robots.txt` generator.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type MetadataRoute } from 'next';
import { WEBSITE_URL } from '@/constants';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default function robots(): MetadataRoute.Robots {
  const SITEMAP = 'sitemap.xml';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      `${WEBSITE_URL}/${SITEMAP}`,
      `${WEBSITE_URL}/posts/${SITEMAP}`,
      `${WEBSITE_URL}/categories/${SITEMAP}`,
    ],
  };
}
