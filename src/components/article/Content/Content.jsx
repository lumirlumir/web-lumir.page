import Link from 'next/link';

import { EXT_MD_REGEXP } from '@/constants';
import { MARKDOWN_DOCUMENT_DATA_META, MARKDOWN_DOCUMENT_DATA_TAG_META } from '@/data';
import { markdownToJsx } from '@/utils/markup';

import styles from './Content.module.scss';

function ContentBoxContainer({ children }) {
  return <div className={styles['content-box-container']}>{children}</div>;
}

function ContentBoxItem({ icon, text }) {
  return (
    <span className={styles['content-box-item']}>
      <span className={styles['react-icons']}>{icon}</span>
      <span>{text}</span>
    </span>
  );
}

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

        <ContentBoxContainer>
          <ContentBoxItem
            icon={MARKDOWN_DOCUMENT_DATA_META.created.reactIcons}
            text={created}
          />
          <ContentBoxItem
            icon={MARKDOWN_DOCUMENT_DATA_META.updated.reactIcons}
            text={updated}
          />
        </ContentBoxContainer>

        <ContentBoxContainer>
          {tags.map(tag => (
            <ContentBoxItem
              key={tag}
              icon={MARKDOWN_DOCUMENT_DATA_META.tags.reactIcons}
              text={MARKDOWN_DOCUMENT_DATA_TAG_META[tag].name.en}
            />
          ))}
        </ContentBoxContainer>
      </div>
    </Link>
  );
}
