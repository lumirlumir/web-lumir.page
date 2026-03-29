/**
 * @fileoverview body.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import styles from './body.module.scss';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Body({ children }: PropsWithChildren) {
  return <body className={styles.body}>{children}</body>;
}
