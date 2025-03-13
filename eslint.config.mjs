import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import bananass from 'eslint-config-bananass';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ['**/build/', '**/coverage/', '**/.next/', '**/archives/'],
  },
  bananass.configs.jsx.next,
  bananass.configs.tsx.next,
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
];
