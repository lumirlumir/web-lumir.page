export default function ThemeScript() {
  const themeScript = `
function getTheme() {
  const themeLocalStorage = localStorage.getItem('data-theme');

  if(themeLocalStorage) return themeLocalStorage;

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

document.documentElement.setAttribute('data-theme', getTheme());
`;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: themeScript,
      }}
    />
  );
}
