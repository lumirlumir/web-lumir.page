import { fileURLToPath } from 'node:url';

const isProduction = process.env.NODE_ENV === 'production';

export default {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com', // Allow GitHub profile image.
      },
    ],
  },
  sassOptions: {
    includePaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
    additionalData: `
      @import 'utils/mixins';
      @import 'utils/variables';
    `,
  },
  // Remove `console.*` output except `console.warn` and `console.error` only in production.
  ...(isProduction && {
    compiler: {
      removeConsole: {
        exclude: ['warn', 'error'],
      },
    },
  }),
};
