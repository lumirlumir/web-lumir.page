/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  ignoreFiles: ['archives/**'],
  rules: {
    'scss/no-global-function-names': null,
  },
};
