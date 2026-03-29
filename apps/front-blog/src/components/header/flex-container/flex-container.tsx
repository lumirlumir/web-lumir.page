/**
 * @fileoverview flex-container.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import styles from './flex-container.module.scss';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function FlexContainer({ children }) {
  return <div className={styles['flex-container']}>{children}</div>;
}
