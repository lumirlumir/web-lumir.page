/**
 * @fileoverview categories.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { FaPen } from '@lumir/react-kit/svgs';

import { PATH_DOCS } from '@/constants';
import { categoryMeta } from '@/data/category';
import { readMarkdownTagTree } from '@/utils/fs';

import styles from './categories.module.scss';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function Categories() {
  const tagTree = await readMarkdownTagTree(PATH_DOCS);

  return (
    <ul className={styles.categories}>
      {Object.keys(tagTree)
        .sort((a, b) => categoryMeta[a].order - categoryMeta[b].order) // Ascending.
        .map(tag => {
          const {
            name: { en, ko },
            reactIcons,
          } = categoryMeta[tag];

          return (
            <li key={tag}>
              <Link href={`/categories/${tag}`}>
                <div className={styles['react-icons']}>{reactIcons}</div>
                <div className={styles['name-en']}>{en}</div>
                <div className={styles['name-ko']}>{ko}</div>
                <div className={styles['count-docs']}>
                  <span>{tagTree[tag].length}</span>
                  <FaPen />
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
