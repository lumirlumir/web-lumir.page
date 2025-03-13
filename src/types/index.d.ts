/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { JSX } from 'react';

/**
 * Represents a Markdown document structure with its `basename`(including extension), `content` and `data`(front matter).
 */
export type MarkdownDocument = {
  /** Including extension */
  basename: string;
  content: string;
  data: MarkdownDocumentData;
};

/**
 * `MarkdownDocument`'s `data`(front matter).
 */
export type MarkdownDocumentData = {
  title: string;
  description: string;
  created: string;
  updated: string;
  tags: MarkdownDocumentDataTag[];
};

/**
 * Metadata for `MarkdownDocument`'s `data`(front matter).
 */
export type MarkdownDocumentDataMeta = {
  name: {
    en: string;
    ko: string;
  };
  reactIcons: JSX.Element;
};

/**
 * `MarkdownDocument`'s `data`'s `tags`.
 */
export type MarkdownDocumentDataTag =
  | 'html'
  | 'markdown'
  | 'css'
  | 'cpp'
  | 'javascript'
  | 'nodejs'
  | 'npm'
  | 'react'
  | 'nextjs'
  | 'linux'
  | 'data'
  | 'database'
  | 'git'
  | 'vscode'
  | 'openai'
  | 'baekjoon'
  | 'programmers'
  | 'algorithm'
  | 'network'
  | 'convention'
  | 'cs'
  | 'synology'
  | 'essay';

/**
 * Metadata for `MarkdownDocument`'s `data`'s `tags`.
 */
export type MarkdownDocumentDataTagMeta = MarkdownDocumentDataMeta & {
  order: number;
};
