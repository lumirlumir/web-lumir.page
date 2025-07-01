/**
 * @fileoverview Next.js configuration file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fileURLToPath } from 'node:url';
import createMDX from '@next/mdx';

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
    additionalData: "@import 'utils/mixins';\n@import 'utils/variables';",
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
};

/**
 * @see https://nextjs.org/docs/app/guides/mdx
 * @see https://github.com/vercel/next.js/tree/canary/examples/mdx
 * @see https://github.com/vercel/next.js/tree/canary/packages/next-mdx
 * @see https://mdxjs.com/packages/mdx/#fields
 */
const withMDX = createMDX({
  extension: /\.(?:md|mdx)$/i,
  options: {
    // remarkPlugins: [],
    // rehypePlugins: [],
    // remarkRehypeOptions: {},
    // format: 'md',
    // mdExtensions: ['.md'],
    // stylePropertyNameCase: 'dom' // or 'css'
  },
});

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default withMDX(nextConfig);
