/**
 * @fileoverview main.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import styles from './main.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Main({ children }: PropsWithChildren) {
  return <main className={styles.main}>{children}</main>;
}
