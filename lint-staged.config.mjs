export default {
  '*': [
    'npx prettier --write --ignore-unknown',
    'npx editorconfig-checker -config .editorconfig-checker.json',
  ],
  '*.{js,mjs,cjs,jsx,ts,mts,cts,tsx,md}': 'npx eslint --fix',
  '*.{css,scss}': 'npx stylelint',
  '*.md': 'npx markdownlint --fix',
  '*.{h,c,cpp}': 'npx clang-format -n -Werror',
};
