/**
 * @fileoverview theme-script.
 */

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function ThemeScript() {
  return (
    <script
      // eslint-disable-next-line react/no-danger -- Safe because the script is hardcoded and does not include any user input.
      dangerouslySetInnerHTML={{
        __html: `
function getTheme() {
  const themeLocalStorage = localStorage.getItem('data-theme');

  if(themeLocalStorage) return themeLocalStorage;

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

document.documentElement.setAttribute('data-theme', getTheme());
`.trim(),
      }}
    />
  );
}
