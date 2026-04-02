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

import { useContext } from 'react';
import { cn } from '@lumir/utils';
import { ThemeContext } from '@/components/common/theme-provider';

import styles from './dark-mode-toggle.module.scss';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext)!; // TODO: Create `useToggle` hook later.

  return (
    <div className={styles['dark-mode-toggle']}>
      {Boolean(theme) && (
        <button
          type="button"
          className={cn(styles['mode-switcher'], theme !== 'dark' && styles.active)}
          onClick={toggleTheme}
        >
          <span className={styles['mode-switcher-main-body']} />
          <span className={styles['mode-switcher-shadow-shape']} />
          <span
            className={`${styles['mode-switcher-sunray']} ${styles['mode-switcher-sunray-sunray-1']}`}
          />
          <span
            className={`${styles['mode-switcher-sunray']} ${styles['mode-switcher-sunray-sunray-2']}`}
          />
          <span
            className={`${styles['mode-switcher-sunray']} ${styles['mode-switcher-sunray-sunray-3']}`}
          />
          <span
            className={`${styles['mode-switcher-sunray']} ${styles['mode-switcher-sunray-sunray-4']}`}
          />
        </button>
      )}
    </div>
  );
}
