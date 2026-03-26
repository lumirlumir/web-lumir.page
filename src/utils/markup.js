import { rehypeImageLazyLoading, rehypeImageUrlReplace } from '@lumir/rehype-plugins';
import { remark } from 'remark';
import { rehype } from 'rehype';
import { GITHUB_REPO_FULL_NAME } from '@/constants';
import { readMarkdownFile } from './fs';

/* eslint-disable prefer-named-capture-group -- TODO */

/**
 * Converts markdown content to plain text.
 *
 * @param {string} markdownContent Markdown content.
 * @returns {string} Plain text.
 */
export function markdownToText(markdownContent) {
  return (
    markdownContent
      // Inline Code Block(`)
      .replace(/`(.+?)`/g, '$1')
      // Italic(*), Bold(**), Italic & Bold(***)
      .replace(/(\*{1,3})(\S)(.*?\S)??\1/g, '$2$3')
      // <sup>...</sup>
      .replace(/<sup>\s*(.*?)\s*<\/sup>/g, '($1)')
  );
}

/**
 * Converts markdown content to HTML using GitHub's Markdown API.
 *
 * @async
 * @param {string} markdownContent Markdown content.
 * @returns {Promise<string>} A promise that resolves to HTML.
 */
export async function markdownToHtml(markdownContent) {
  const { value: markdownValue } = await remark().process(markdownContent);

  const response = await fetch('https://api.github.com/markdown', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GH_PAT}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      text: String(markdownValue),
      mode: 'gfm',
      context: GITHUB_REPO_FULL_NAME,
    }),
    cache: 'force-cache', // https://nextjs.org/docs/app/guides/upgrading/version-15#fetch-requests
  });

  const html = await response.text();

  const { value: htmlValue } = await rehype()
    .use(rehypeImageLazyLoading)
    .use(rehypeImageUrlReplace, {
      searchValue: /^\/public/,
      replaceValue: '',
    })
    .process(html);

  return String(htmlValue);
}

/**
 * Converts markdown content to HTML from path.
 *
 * @async
 * @param {string} pathToMarkdownFile Path to a markdown file.
 * @returns {Promise<string>} A promise that resolves to HTML.
 */
export async function markdownToHtmlFromPath(pathToMarkdownFile) {
  const {
    content,
    data: { title },
  } = await readMarkdownFile(pathToMarkdownFile);

  const html = await markdownToHtml(writeTitleIntoMarkdown(title, content));

  return html;
}

/**
 * Adds a title as a top-level heading to the given markdown content.
 *
 * @param {string} title Title to add as a heading.
 * @param {string} markdownContent Markdown content.
 * @returns {string} Markdown content with the title as a heading, if provided.
 */
export function writeTitleIntoMarkdown(title, markdownContent) {
  return `${title ? `# ${title}\n\n` : ''}${markdownContent}`;
}
