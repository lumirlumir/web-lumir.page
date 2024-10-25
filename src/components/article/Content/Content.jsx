import Link from 'next/link';

import { EXT_MD_REGEXP } from '@/constants';
import { MARKDOWN_DOCUMENT_DATA_META, MARKDOWN_DOCUMENT_DATA_TAG_META } from '@/data';
import { markdownToJsx } from '@/utils/markup';

import styles from './Content.module.scss';

export default function Content({ markdownDocument }) {
  const {
    basename,
    data: { title, description, created, updated, tags },
  } = markdownDocument;

  return (
    <Link href={`/posts/${basename.replace(EXT_MD_REGEXP, '')}`}>
      <div className={styles.content}>
        <div className={`${styles.title} markdown-body`}>{markdownToJsx(title)}</div>

        <div className={`${styles.description} markdown-body`}>
          {markdownToJsx(description)}
        </div>

        <div>
          <span className={styles.date}>
            <span className={styles['react-icons']}>
              {MARKDOWN_DOCUMENT_DATA_META.created.reactIcons}
            </span>
            <span>{created}</span>
          </span>
          <span className={styles.date}>
            <span className={styles['react-icons']}>
              {MARKDOWN_DOCUMENT_DATA_META.updated.reactIcons}
            </span>
            <span>{updated}</span>
          </span>
        </div>

        <div className={styles.tags}>
          {tags.map(tag => (
            <span key={tag} className={styles.tag}>
              <span className={styles['react-icons']}>
                {MARKDOWN_DOCUMENT_DATA_META.tags.reactIcons}
              </span>
              <span>{MARKDOWN_DOCUMENT_DATA_TAG_META[tag].name.en}</span>
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
