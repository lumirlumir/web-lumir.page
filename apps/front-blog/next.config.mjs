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

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'mjs', 'jsx', 'ts', 'mts', 'tsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com', // Allow GitHub profile image.
      },
    ],
  },
  sassOptions: {
    includePaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
    additionalData: "@import 'utils/mixins';",
  },
  experimental: {
    reactCompiler: true,
  },
  // Remove `console.*` output except `console.warn` and `console.error` only in production.
  ...(isProd && {
    compiler: {
      removeConsole: {
        exclude: ['warn', 'error'],
      },
    },
  }),
  typedRoutes: true,

  webpack(config) {
    // Add a rule to handle Markdown files as raw text.
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source',
    });

    return config;
  },
};

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default nextConfig;
