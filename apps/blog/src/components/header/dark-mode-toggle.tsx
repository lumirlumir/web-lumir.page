/**
 * @fileoverview dark-mode-toggle.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { cn } from '@lumir/utils';
import { useThemeContext } from '@/components/common/theme-context';
import styles from './dark-mode-toggle.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function DarkModeToggle() {
  const [theme, toggleTheme] = useThemeContext();

  return (
    <div className={cn(styles['dark-mode-toggle'], 'custom-flex-center')}>
      <button
        type="button"
        className={styles.switch}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Dark mode' : 'Light mode'}
        aria-pressed={theme === 'dark'}
        suppressHydrationWarning // TODO: Remove it later.
      >
        <span className={styles.orb} aria-hidden="true" />
        <span className={styles.shadow} aria-hidden="true" />
        <span className={cn(styles.sunray, styles.sunray1)} aria-hidden="true" />
        <span className={cn(styles.sunray, styles.sunray2)} aria-hidden="true" />
        <span className={cn(styles.sunray, styles.sunray3)} aria-hidden="true" />
        <span className={cn(styles.sunray, styles.sunray4)} aria-hidden="true" />
      </button>
    </div>
  );
}
