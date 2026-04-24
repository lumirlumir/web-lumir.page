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
import { useThemeContext } from '@/components/common/theme-provider';
import styles from './dark-mode-toggle.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function DarkModeToggle() {
  const [, toggleTheme] = useThemeContext();

  return (
    <div className={cn(styles['dark-mode-toggle'], 'custom-flex-center')}>
      <button type="button" className={styles.switcher} onClick={toggleTheme}>
        <span className={styles['main-body']} />
        <span className={styles['shadow-shape']} />
        <span className={cn(styles.sunray, styles.sunray1)} />
        <span className={cn(styles.sunray, styles.sunray2)} />
        <span className={cn(styles.sunray, styles.sunray3)} />
        <span className={cn(styles.sunray, styles.sunray4)} />
      </button>
    </div>
  );
}
