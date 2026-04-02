import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    alias: {
      '@': './src',
    },
    include: ['src/**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
  },
});
