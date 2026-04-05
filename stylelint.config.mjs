/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  ignoreFiles: ['archives/**', '**/coverage/**'],
  rules: {
    'scss/no-global-function-names': null,

    // Enforce specific media feature breakpoints for consistency
    'media-feature-range-notation': 'context',
    'media-feature-name-allowed-list': ['width'],
    'media-feature-name-unit-allowed-list': {
      width: ['px'],
    },
    'media-feature-name-value-allowed-list': {
      width: ['640px', '768px', '1024px', '1280px', '1536px'],
    },
  },
};
