/**
 * @fileoverview section.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import styles from './section.module.css';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Section({ children }: PropsWithChildren) {
  return <section className={styles.section}>{children}</section>;
}
