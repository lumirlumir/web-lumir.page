/**
 * @fileoverview theme-provider.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the available application theme modes.
 *
 * @default 'dark'
 */
export type Theme = 'dark' | 'light';

/**
 * Defines the shape of the context value provided by the `ThemeContext`,
 * including the current theme and a function to toggle between themes.
 */
export type ThemeContextValue = [theme: Theme, toggleTheme: () => void];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * The fallback theme used when no theme can be resolved from the document or storage.
 */
export const defaultTheme = 'dark' satisfies Theme;

/**
 * React context that stores the current theme and the function used to toggle it.
 *
 * Prefer consuming this context through `useThemeContext()` instead of calling `useContext(ThemeContext)` directly.
 *
 * @example
 * ```tsx
 * function ThemeLabel() {
 *   const [theme] = useThemeContext();
 *
 *   return <span>Current theme: {theme}</span>;
 * }
 * ```
 */
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Returns the current theme context value.
 *
 * @returns A tuple containing the current theme and a function that toggles it.
 * @throws {Error} Throws when called outside of `ThemeProvider`.
 *
 * @example
 * ```tsx
 * function DarkModeToggle() {
 *   const [theme, toggleTheme] = useThemeContext();
 *
 *   return (
 *     <button type="button" onClick={toggleTheme}>
 *       Switch to {theme === 'dark' ? 'light' : 'dark'}
 *     </button>
 *   );
 * }
 * ```
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('`useThemeContext` must be used within a `ThemeProvider`.');
  }

  return context;
}

/**
 * Provides theme state and a toggle handler to all descendant components.
 *
 * The initial theme is resolved from the `data-theme` attribute on the root
 * document element, then kept in sync with both the document and `localStorage`.
 *
 * @param props The component props.
 * @param props.children The child elements that should receive theme context.
 * @returns A context provider wrapping the given children.
 *
 * @example
 * ```tsx
 * export default function RootLayout({ children }: PropsWithChildren) {
 *   return (
 *     <html lang="ko" data-theme="dark" suppressHydrationWarning>
 *       <body>
 *         <ThemeProvider>
 *           {children}
 *         </ThemeProvider>
 *       </body>
 *     </html>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(() => {
    // During server-side rendering, `document` is not available, so we return the default theme.
    if (typeof document === 'undefined') return defaultTheme;

    return document.documentElement.getAttribute('data-theme') === 'light'
      ? 'light'
      : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);

    // `localStorage` is scoped per origin, so this key will not conflict across different domains,
    // protocols, or ports. It can only collide with other apps running on the same origin.
    localStorage.setItem('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(previousTheme => (previousTheme === 'dark' ? 'light' : 'dark'));
  };

  // eslint-disable-next-line react/jsx-no-constructed-context-values -- React Compiler automatically optimizes context values.
  return <ThemeContext value={[theme, toggleTheme]}>{children}</ThemeContext>;
}
