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

import { useState, type PropsWithChildren } from 'react';
import { HiOutlineMenuAlt2 } from '@lumir/react-kit/svgs';
import { cn } from '@lumir/utils';
import styles from './aside.module.scss';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Aside({ children }: PropsWithChildren) {
  const [visible, setVisible] = useState<boolean>(false); // TODO: create `useToggle` hook

  return (
    <>
      <aside className={cn(styles.aside, visible && styles.visible)}>{children}</aside>
      <div
        className={cn(styles.div, visible && styles.visible)}
        onClick={() => {
          setVisible(prevState => !prevState);
        }}
      >
        <HiOutlineMenuAlt2 />
      </div>
    </>
  );
}
