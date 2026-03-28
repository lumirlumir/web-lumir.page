/**
 * @fileoverview header.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import styles from './header.module.scss';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Header({ children }: PropsWithChildren) {
  return <header className={styles.header}>{children}</header>;
}
