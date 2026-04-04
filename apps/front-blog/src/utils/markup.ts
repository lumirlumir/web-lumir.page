/**
 * @fileoverview Defines markdown markup helpers.
 */

/* eslint-disable import/prefer-default-export -- TODO */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { rehypeImageLazyLoading, rehypeImageUrlReplace } from '@lumir/rehype-plugins';
import { remarkHeadingFromTitle } from '@lumir/remark-plugins';
import { rehype } from 'rehype';
import { remark } from 'remark';
import { GITHUB_REPO_FULL_NAME } from '@/constants';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

interface MarkdownToHtmlOptions {
  /**
   * Prepend an H1 heading generated from the provided title.
   */
  title: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts markdown content to HTML using GitHub's Markdown API.
 */ // TODO: Consolidate this with `./markdown-to-html.ts` and remove the GitHub API dependency.
export async function markdownToHtml(
  markdown: string,
  options?: MarkdownToHtmlOptions,
): Promise<string> {
  const markdownFile = await remark()
    .use(remarkHeadingFromTitle, options?.title)
    .process(markdown);

  const response = await fetch('https://api.github.com/markdown', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GH_PAT}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      text: String(markdownFile),
      mode: 'gfm',
      context: GITHUB_REPO_FULL_NAME,
    }),
    cache: 'force-cache', // https://nextjs.org/docs/app/guides/upgrading/version-15#fetch-requests
  });

  const html = await response.text();

  const htmlFile = await rehype()
    .data('settings', { fragment: true })
    .use(rehypeImageLazyLoading)
    .use(rehypeImageUrlReplace, {
      searchValue: /^\/apps\/front-blog\/public/,
      replaceValue: '',
    })
    .process(html);

  return String(htmlFile);
}
