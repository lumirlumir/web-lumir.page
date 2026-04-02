import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
  },
});
