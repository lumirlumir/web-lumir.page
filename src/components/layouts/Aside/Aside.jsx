'use client';

import { useState } from 'react';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';

import styles from './Aside.module.scss';

export default function Aside({ children }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <aside className={`${styles.aside} ${visible ? styles.visible : ''}`}>
        {children}
      </aside>
      <div
        className={`${styles.div} ${visible ? styles.visible : ''}`}
        onClick={() => {
          setVisible(prevState => !prevState);
        }}
      >
        <HiOutlineMenuAlt2 />
      </div>
    </>
  );
}

// TODO: Add `useMemo` Hook to `${visible ? styles.visible : ''}`.
