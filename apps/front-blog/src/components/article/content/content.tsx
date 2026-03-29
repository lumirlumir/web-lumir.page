/**
 * @fileoverview content.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { type JSX, type PropsWithChildren } from 'react';
import { EXT_MD_REGEXP } from '@/constants';
import { frontmatterMeta } from '@/data/frontmatter';
import { categoryMeta } from '@/data/category';
import { markdownToHtml } from '@/utils/markup';
import { type VMarkdownFile } from '@/data/v-markdown-file';

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
  vMarkdownFile: {
    basename,
    data: { title, description, created, updated, tags },
  },
}: {
  vMarkdownFile: VMarkdownFile;
}) {
  return (
    <Link href={`/posts/${basename.replace(EXT_MD_REGEXP, '')}`}>
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
          {tags.map(tag => (
            <ContentBoxItem
              key={tag}
              icon={frontmatterMeta.tags.reactIcons}
              text={categoryMeta[tag].name.en}
            />
          ))}
        </ContentBoxContainer>
      </div>
    </Link>
  );
}
