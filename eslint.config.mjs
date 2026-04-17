/**
 * @fileoverview ESLint configuration file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fileURLToPath } from 'node:url';
import { defineConfig, globalIgnores } from 'eslint/config';
import bananass from 'eslint-config-bananass';
import md from 'eslint-markdown';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default defineConfig([
  globalIgnores(
    [
      'apps/moing/',
      '**/build/',
      '**/coverage/',
      '**/.next/',
      '**/archives/',
      '**/next-env.d.ts',
    ],
    'global/ignores',
  ),

  bananass.configs.jsxNext,
  bananass.configs.tsxNext,
  bananass.configs.json,
  bananass.configs.jsonc,
  bananass.configs.json5,
  md.configs.recommended,
  md.configs.stylistic,

  {
    name: 'global/apps/blog',
    settings: {
      next: {
        rootDir: fileURLToPath(new URL('./apps/blog', import.meta.url)),
      },
      node: {
        resolverConfig: {
          // `eslint-plugin-n` uses webpack's `enhanced-resolve` under the hood.
          alias: {
            '@': fileURLToPath(new URL('./apps/blog/src', import.meta.url)),
          },
        },
      },
    },
    languageOptions: {
      globals: {
        PageProps: false, // Next.js
      },
    },
  },
  {
    name: 'global/apps/moing',
    settings: {
      node: {
        resolverConfig: {
          // `eslint-plugin-n` uses webpack's `enhanced-resolve` under the hood.
          alias: {
            '@': fileURLToPath(new URL('./apps/moing/src', import.meta.url)),
          },
        },
      },
    },
  },
  {
    name: 'md/global',
    files: ['**/*.md'],
    rules: {
      'md/allow-link-url': [
        'error',
        {
          disallowUrls: [/^\.\//],
        },
      ],
    },
  },
  {
    name: 'md/posts/docs',
    files: ['apps/blog/src/posts/docs/**/*.md'],
    rules: {
      'md/allow-image-url': [
        'error',
        {
          allowUrls: [/^\/apps\/blog\/public\/images\//],
        },
      ],
    },
  },
]);
