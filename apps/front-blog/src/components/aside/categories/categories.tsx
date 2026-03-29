/**
 * @fileoverview categories.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { FaPen } from '@lumir/react-kit/svgs';
import { PATH_DOCS } from '@/constants';
import { categoryMeta, type CategoryKey } from '@/data/category';
import { readMarkdownTagTree } from '@/utils/fs';
import styles from './categories.module.scss';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const tagTree = await readMarkdownTagTree(PATH_DOCS);
const tags = Object.keys(tagTree) as CategoryKey[];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function Categories() {
  return (
    <ul className={styles.categories}>
      {tags
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
                  <span>{tagTree[tag]?.length}</span>
                  <FaPen />
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
