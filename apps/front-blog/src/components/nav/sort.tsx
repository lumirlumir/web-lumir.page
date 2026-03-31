/**
 * @fileoverview sort.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState, type PropsWithChildren } from 'react';
import { FaAngleDown, FaAngleUp, GrSort } from '@lumir/react-kit/svgs';
import { frontmatterMeta, type SortableFrontmatterKey } from '@/data/frontmatter';
import { sortMeta, type SortKey } from '@/data/sort';
import styles from './sort.module.scss';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function SortContainer({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState<boolean>(false); // TODO: Create `useToggle` hook later.

  function onClick() {
    setIsOpen(prevState => !prevState);
  }

  return (
    <div>
      <div className={styles['sort-item']} onClick={onClick}>
        <div className={styles['react-icons']}>
          <GrSort />
        </div>
        <div className={styles['name-en']}>Sort</div>
        <div className={styles['name-ko']}>정렬</div>
        <div className={styles.order}>{isOpen ? <FaAngleUp /> : <FaAngleDown />}</div>
      </div>
      {isOpen ? <ul>{children}</ul> : null}
    </div>
  );
}

function SortItem({ sort, order }: { sort: SortableFrontmatterKey; order: SortKey }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function onClick(sort: SortableFrontmatterKey, order: SortKey) {
    const params = new URLSearchParams(searchParams);

    params.set('sort', sort);
    params.set('order', order);

    // @ts-expect-error -- TODO
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <li className={styles['sort-item']} onClick={() => onClick(sort, order)}>
      <div className={styles['react-icons']}>{frontmatterMeta[sort].reactIcons}</div>
      <div
        className={styles['name-en']}
      >{`${frontmatterMeta[sort].name.en} / ${sortMeta[order].name.en}`}</div>
      <div
        className={styles['name-ko']}
      >{`${frontmatterMeta[sort].name.ko} / ${sortMeta[order].name.ko}`}</div>
      <div className={styles.order}>{sortMeta[order].reactIcons}</div>
    </li>
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Sort() {
  return (
    <SortContainer>
      <SortItem sort="title" order="desc" />
      <SortItem sort="title" order="asc" />
      <SortItem sort="created" order="desc" />
      <SortItem sort="created" order="asc" />
      <SortItem sort="updated" order="desc" />
      <SortItem sort="updated" order="asc" />
    </SortContainer>
  );
}
// TODO: add `title` prop for a11y
