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
import { useToggle } from '@lumir/react-kit/hooks';

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
  const [initialized, setInitialized] = useState(false);
  const [isDarkTheme, toggleTheme] = useToggle(false);
  const resolvedTheme = isDarkTheme ? 'dark' : 'light';
  const theme = initialized ? resolvedTheme : null;

  useEffect(() => {
    // Initialization
    if (!initialized) {
      const initialTheme = document.documentElement.getAttribute('data-theme');

      if (initialTheme === 'dark') toggleTheme();
      else if (initialTheme !== 'light')
        throw TypeError('Invalid theme. Use "dark" or "light".');

      // eslint-disable-next-line react-hooks/set-state-in-effect -- Theme is initialized from the DOM after mount.
      setInitialized(true);
      return;
    }

    document.documentElement.setAttribute('data-theme', resolvedTheme);
    localStorage.setItem('data-theme', resolvedTheme);
  }, [initialized, resolvedTheme, toggleTheme]);

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}
