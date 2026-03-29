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

import { createContext, useEffect, useState, type PropsWithChildren } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export type Theme = 'dark' | 'light' | null;

// --------------------------------------------------------------------------------
// Named Export
// --------------------------------------------------------------------------------

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>(null); // Should be 'dark' or 'light' after initialized with `useEffect`.

  useEffect(() => {
    // Initialization
    if (theme === null) {
      // eslint-disable-next-line -- TODO
      setTheme(document.documentElement.getAttribute('data-theme') as Theme);
      return;
    }

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else throw TypeError('Invalid theme. Use "dark" or "light".');
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}
