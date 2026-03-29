/**
 * @fileoverview Defines the structure of a virtual Markdown file.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type Frontmatter } from '@/data/frontmatter';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Represents the metadata of a virtual Markdown file, containing the `basename` (including extension) and `data` (frontmatter) of the Markdown document.
 */
export interface VMarkdownFileMeta {
  /**
   * The basename of the Markdown file, including the extension (e.g., `example.md`).
   */
  basename: string;

  /**
   * The data of the Markdown file, representing the frontmatter metadata defined in the `Frontmatter` interface.
   */
  data: Frontmatter;
}

/**
 * Represents a Virtual Markdown file, containing the `basename` (including extension), `content`, and `data` (frontmatter) of the Markdown document.
 */
export interface VMarkdownFile extends VMarkdownFileMeta {
  /**
   * The content of the Markdown file, representing the raw Markdown text.
   */
  content: string;
}
