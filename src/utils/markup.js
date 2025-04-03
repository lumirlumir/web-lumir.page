import parse from 'html-react-parser';

import { GITHUB_REPO_FULL_NAME } from '@/constants';
import { readMarkdownFile } from './fs';

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
  const response = await fetch('https://api.github.com/markdown', {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${process.env.GH_PAT}`,
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    body: JSON.stringify({
      text: markdownContent,
      mode: 'gfm',
      context: GITHUB_REPO_FULL_NAME,
    }),
  });

  return response.text();
}

/**
 * Converts markdown content to JSX.
 *
 * @async
 * @param {string} markdownContent Markdown content.
 * @returns {Promise<JSX.Element>} A promise that resolves to JSX.
 */
export async function markdownToJsx(markdownContent) {
  const html = await markdownToHtml(markdownContent);
  const jsx = htmlToJsx(html);

  return jsx;
}

/**
 * Converts markdown content to JSX from path.
 *
 * @async
 * @param {string} pathToMarkdownFile Path to a markdown file.
 * @returns {Promise<JSX.Element>} A promise that resolves to JSX.
 */
export async function markdownToJsxFromPath(pathToMarkdownFile) {
  const {
    content,
    data: { title },
  } = await readMarkdownFile(pathToMarkdownFile);

  const markdownContent = writeTitleIntoMarkdown(title, content);
  const jsx = await markdownToJsx(markdownContent);

  return jsx;
}

/**
 * Converts HTML to JSX using `html-react-parser`
 *
 * @param {string} html HTML
 * @returns {JSX.Element} JSX
 */
export function htmlToJsx(html) {
  return parse(html, {
    replace({ name, attribs }) {
      // <img>
      if (name === 'img') {
        attribs.src = attribs.src.startsWith('/public')
          ? attribs.src.replace(/^\/public/, '')
          : attribs.src;
        attribs.loading = 'lazy';
      }
    },
  });
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
