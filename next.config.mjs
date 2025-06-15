/**
 * @fileoverview Next.js configuration file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fileURLToPath } from 'node:url';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const isProd = process.env.NODE_ENV === 'production';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com', // Allow GitHub profile image.
      },
    ],
  },
  sassOptions: {
    includePaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
    additionalData: `
      @import 'utils/mixins';
      @import 'utils/variables';
    `,
  },
  // Remove `console.*` output except `console.warn` and `console.error` only in production.
  ...(isProd && {
    compiler: {
      removeConsole: {
        exclude: ['warn', 'error'],
      },
    },
  }),
};
