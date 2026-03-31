/**
 * @fileoverview Defines markdown markup helpers.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { rehypeImageLazyLoading, rehypeImageUrlReplace } from '@lumir/rehype-plugins';
import { rehype } from 'rehype';
import { GITHUB_REPO_FULL_NAME } from '@/constants';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Converts markdown content to HTML using GitHub's Markdown API.
 */ // TODO: Consolidate this with `./markdown-to-html.ts` and remove the GitHub API dependency.
export async function markdownToHtml(markdown: string): Promise<string> {
  const response = await fetch('https://api.github.com/markdown', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GH_PAT}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      text: String(markdown),
      mode: 'gfm',
      context: GITHUB_REPO_FULL_NAME,
    }),
    cache: 'force-cache', // https://nextjs.org/docs/app/guides/upgrading/version-15#fetch-requests
  });

  const html = await response.text();

  const file = await rehype()
    .data('settings', { fragment: true })
    .use(rehypeImageLazyLoading)
    .use(rehypeImageUrlReplace, {
      searchValue: /^\/public/,
      replaceValue: '',
    })
    .process(html);

  return String(file);
}

/**
 * Adds a title as a top-level heading to the given markdown content.
 */
export function writeTitleIntoMarkdown(title: string, markdownContent: string) {
  return `${title ? `# ${title}\n\n` : ''}${markdownContent}`;
}
