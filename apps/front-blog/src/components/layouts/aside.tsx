/**
 * @fileoverview aside.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import { useToggle } from '@lumir/react-kit/hooks';
import { HiOutlineMenuAlt2 } from '@lumir/react-kit/svgs';
import styles from './aside.module.scss';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Aside({ children }: PropsWithChildren) {
  const [visible, toggleVisible] = useToggle(false);

  return (
    <>
      <aside className={`${styles.aside} ${visible ? styles.visible : ''}`}>
        {children}
      </aside>
      <div
        className={`${styles.div} ${visible ? styles.visible : ''}`}
        onClick={toggleVisible}
      >
        <HiOutlineMenuAlt2 />
      </div>
    </>
  );
}
