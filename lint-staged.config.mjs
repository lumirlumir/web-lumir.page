export default {
  '*': [
    'npx prettier --check --ignore-unknown',
    'npx editorconfig-checker -config .editorconfig-checker.json',
  ],
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,md}': 'npx eslint',
  '*.{css,scss}': 'npx stylelint',
  '*.md': 'npx markdownlint',
  'src/docs/**/*.md': 'npx textlint -f pretty-error',
  '*.{h,c,cpp}': 'npx clang-format -n -Werror',
};
