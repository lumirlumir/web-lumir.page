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
  mark.configs.recommendedGfm,
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
    rules: {
      'mark/en-capitalization': 'off',
      'mark/no-unused-definition': 'off',
    },
  },
]);
