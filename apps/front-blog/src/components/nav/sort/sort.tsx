'use client';

import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  FaAngleDown,
  FaAngleUp,
  FaArrowDownWideShort,
  FaArrowUpShortWide,
  GrSort,
} from '@lumir/react-kit/svgs';

import { frontmatterMeta } from '@/data/frontmatter';

import styles from './sort.module.scss';

function SortContainer({ children }) {
  const [isOpen, setIsOpen] = useState(false);

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
      {Boolean(isOpen) && <ul>{children}</ul>}
    </div>
  );
}

function SortItem({ sort, order }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function onClick(sort, order) {
    const params = new URLSearchParams(searchParams);

    params.set('sort', sort);
    params.set('order', order);

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <li className={styles['sort-item']} onClick={() => onClick(sort, order)}>
      <div className={styles['react-icons']}>{frontmatterMeta[sort].reactIcons}</div>
      <div
        className={styles['name-en']}
      >{`${frontmatterMeta[sort].name.en} / ${order === 'desc' ? 'Desc' : 'Asc'}`}</div>
      <div
        className={styles['name-ko']}
      >{`${frontmatterMeta[sort].name.ko} / ${order === 'desc' ? '내림차순' : '오름차순'}`}</div>
      <div className={styles.order}>
        {order === 'desc' ? <FaArrowDownWideShort /> : <FaArrowUpShortWide />}
      </div>
    </li>
  );
}

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

// TODO: useCallback hook
// TODO: add `title` prop for a11y
