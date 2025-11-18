/**
 * @fileoverview ESLint configuration file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { fileURLToPath } from 'node:url';
import { defineConfig, globalIgnores } from 'eslint/config';
import bananass from 'eslint-config-bananass';
import mark from 'eslint-plugin-mark';

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
  mark.configs.recommended,
  mark.configs.stylistic,

  {
    name: 'global',
    settings: {
      node: {
        resolverConfig: {
          // `eslint-plugin-n` uses webpack's `enhanced-resolve` under the hood.
          alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
          },
        },
      },
    },
  },
  {
    name: 'md/global',
    files: ['**/*.md'],
    rules: {
      'mark/allow-link-url': [
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
      'mark/allow-image-url': [
        'error',
        {
          allowUrls: [/^\/public\/images\//],
        },
      ],
    },
  },
]);
