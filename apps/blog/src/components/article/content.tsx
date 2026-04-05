/**
 * @fileoverview content.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Link from 'next/link';
import { type JSX, type PropsWithChildren } from 'react';
import { cn } from '@lumir/utils';
import { categoryMeta } from '@/data/category';
import { frontmatterMeta } from '@/data/frontmatter';
import { type VMarkdownFile } from '@/data/v-markdown-file';
import { markdownToHtmlLite } from '@/utils/markdown-to-html';
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
    slug,
    data: { title, description, created, updated, categories },
  },
}: {
  vMarkdownFile: VMarkdownFile;
}) {
  return (
    <Link href={`/posts/${slug}`}>
      <div className={cn(styles.content, 'custom-hover-effect')}>
        <div
          className={cn(styles.title, 'markdown-body')}
          // eslint-disable-next-line react/no-danger -- Safe because the title comes from the local file and is controlled.
          dangerouslySetInnerHTML={{ __html: await markdownToHtmlLite(title) }}
        />

        <div
          className={cn(styles.description, 'markdown-body')}
          // eslint-disable-next-line react/no-danger -- Safe because the description comes from the local file and is controlled.
          dangerouslySetInnerHTML={{ __html: await markdownToHtmlLite(description) }}
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
