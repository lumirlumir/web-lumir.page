/**
 * @fileoverview article.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import styles from './article.module.scss';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Article({ children }: PropsWithChildren) {
  return <article className={styles.article}>{children}</article>;
}
