/**
 * @fileoverview nav.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import styles from './nav.module.scss';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Nav({ children }: PropsWithChildren) {
  return <nav className={styles.nav}>{children}</nav>;
}
