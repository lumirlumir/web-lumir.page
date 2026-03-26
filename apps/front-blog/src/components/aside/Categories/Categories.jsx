import Link from 'next/link';
import { FaPen } from 'react-icons/fa6';

import { PATH_DOCS } from '@/constants';
import { MARKDOWN_DOCUMENT_DATA_TAG_META } from '@/data';
import { readMarkdownTagTree } from '@/utils/fs';

import styles from './Categories.module.scss';

export default async function Categories() {
  const tagTree = await readMarkdownTagTree(PATH_DOCS);

  return (
    <ul className={styles.categories}>
      {Object.keys(tagTree)
        .sort(
          (a, b) =>
            MARKDOWN_DOCUMENT_DATA_TAG_META[a].order -
            MARKDOWN_DOCUMENT_DATA_TAG_META[b].order,
        ) // Ascending.
        .map(tag => {
          const {
            name: { en, ko },
            reactIcons,
          } = MARKDOWN_DOCUMENT_DATA_TAG_META[tag];

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
