import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

import { defineConfig } from 'eslint/config';
import bananass from 'eslint-config-bananass';
import mark from 'eslint-plugin-mark';

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig([
  {
    name: 'global/ignores',
    ignores: ['**/build/', '**/coverage/', '**/.next/', '**/archives/'],
  },
  bananass.configs.jsxNext,
  bananass.configs.tsxNext,
  mark.configs.recommendedGfm,
  {
    rules: {
      'mark/en-capitalization': 'off',
    },
  },
  {
    settings: {
      node: {
        resolverConfig: {
          // `eslint-plugin-n` uses webpack's `enhanced-resolve` under the hood.
          alias: {
            '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src'),
          },
        },
      },
    },
  },
]);
