'use client';

import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(null); // Should be 'dark' or 'light' after initialized with useEffect.

  useEffect(() => {
    // Initialization
    if (theme === null) {
      setTheme(document.documentElement.getAttribute('data-theme')); // eslint-disable-line -- TODO
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
