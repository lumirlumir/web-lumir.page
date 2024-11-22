module.exports = {
  '*': [
    'npx prettier --check',
    'npx editorconfig-checker -config .editorconfig-checker.json',
  ],
  '*.{js,jsx}': 'npx eslint',
  '*.{css,scss}': 'npx stylelint',
  '*.md': 'npx markdownlint',
  'src/docs/**/*.md': 'npx textlint -f pretty-error',
  '*.{h,c,cpp}': 'npx clang-format -n -Werror',
};
