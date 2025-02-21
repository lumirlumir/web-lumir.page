const path = require('node:path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: 'avatars.githubusercontent.com', // Allow GitHub profile image.
      },
    ],
  },
  sassOptions: {
    includePaths: [path.resolve(__dirname, 'src', 'styles')],
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
