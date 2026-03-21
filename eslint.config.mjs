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

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
  globalIgnores(
    ['**/build/', '**/coverage/', '**/.next/', '**/archives/'],
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
    name: 'global',
    settings: {
      node: {
        resolverConfig: {
          // `eslint-plugin-n` uses webpack's `enhanced-resolve` under the hood.
          alias: {
            '@/app': fileURLToPath(new URL('./src/app', import.meta.url)),
            '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
            '@/constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
            '@/data': fileURLToPath(new URL('./src/data', import.meta.url)),
            '@/posts': fileURLToPath(new URL('./src/posts', import.meta.url)),
            '@/styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
            '@/types': fileURLToPath(new URL('./src/types', import.meta.url)),
            '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
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
    files: ['src/posts/docs/**/*.md'],
    rules: {
      'md/allow-image-url': [
        'error',
        {
          allowUrls: [/^\/public\/images\//],
        },
      ],
    },
  },
]);
