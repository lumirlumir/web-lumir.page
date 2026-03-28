export const ThemeContext: import('react').Context<{
  theme: string | null;
  toggleTheme: () => void;
}>;

declare const ThemeProvider: import('react').JSXElementConstructor<{
  children: import('react').ReactNode;
}>;

export default ThemeProvider;
