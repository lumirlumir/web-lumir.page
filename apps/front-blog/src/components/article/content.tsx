/**
 * @fileoverview content.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { type JSX, type PropsWithChildren } from 'react';
import { categoryMeta } from '@/data/category';
import { frontmatterMeta } from '@/data/frontmatter';
import { type VMarkdownFileMeta } from '@/data/v-markdown-file';
import { markdownToHtml } from '@/utils/markup';
import styles from './content.module.scss';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function ContentBoxContainer({ children }: PropsWithChildren) {
  return <div className={styles['content-box-container']}>{children}</div>;
}

function ContentBoxItem({ icon, text }: { icon: JSX.Element; text: string }) {
  return (
    <span className={styles['content-box-item']}>
      <span className={styles['react-icons']}>{icon}</span>
      <span>{text}</span>
    </span>
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function Content({
  vMarkdownFileMeta: {
    slug,
    data: { title, description, created, updated, categories },
  },
}: {
  vMarkdownFileMeta: VMarkdownFileMeta;
}) {
  return (
    <Link href={`/posts/${slug}`}>
      <div className={styles.content}>
        <div
          className={`${styles.title} markdown-body`}
          dangerouslySetInnerHTML={{ __html: await markdownToHtml(title) }} // eslint-disable-line react/no-danger -- Safe because the title is controlled and sanitized.
        />

        <div
          className={`${styles.description} markdown-body`}
          dangerouslySetInnerHTML={{ __html: await markdownToHtml(description) }} // eslint-disable-line react/no-danger -- Safe because the description is controlled and sanitized.
        />

        <ContentBoxContainer>
          <ContentBoxItem icon={frontmatterMeta.created.reactIcons} text={created} />
          <ContentBoxItem icon={frontmatterMeta.updated.reactIcons} text={updated} />
        </ContentBoxContainer>

        <ContentBoxContainer>
          {categories.map(category => (
            <ContentBoxItem
              key={category}
              icon={frontmatterMeta.categories.reactIcons}
              text={categoryMeta[category].name.en}
            />
          ))}
        </ContentBoxContainer>
      </div>
    </Link>
  );
}
