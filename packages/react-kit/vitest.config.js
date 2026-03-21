import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright'; // eslint-disable-line -- TODO

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
    include: ['src/**/*.test.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    typecheck: true,
  },
});
