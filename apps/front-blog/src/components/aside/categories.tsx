/**
 * @fileoverview categories.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { FaPen } from '@lumir/react-kit/svgs';
import { categoryMeta } from '@/data/category';
import {
  listNonEmptyCategoryKeys,
  markdownCollection,
} from '@/utils/markdown-collection';
import styles from './categories.module.scss';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const { category } = markdownCollection;
const categoryKeys = listNonEmptyCategoryKeys(category);

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function Categories() {
  return (
    <ul className={styles.categories}>
      {categoryKeys
        .sort((a, b) => categoryMeta[a].order - categoryMeta[b].order) // Ascending.
        .map(categoryKey => {
          const {
            name: { en, ko },
            reactIcons,
          } = categoryMeta[categoryKey];

          return (
            <li key={categoryKey}>
              <Link href={`/categories/${categoryKey}`}>
                <div className={styles['react-icons']}>{reactIcons}</div>
                <div className={styles['name-en']}>{en}</div>
                <div className={styles['name-ko']}>{ko}</div>
                <div className={styles['count-docs']}>
                  <span>{category[categoryKey]?.length}</span>
                  <FaPen />
                </div>
              </Link>
            </li>
          );
        })}
    </ul>
  );
}
