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
 * Represents a Virtual Markdown file, containing the `slug` (excluding extension), `data` (frontmatter), and `content` of the Markdown document.
 */
export interface VMarkdownFile {
  /**
   * The slug of the Markdown file, excluding the leading directory path and extension (e.g., `example` for `./example.md`).
   */
  readonly slug: string;

  /**
   * The data of the Markdown file, representing the frontmatter metadata defined in the `Frontmatter` interface.
   */
  readonly data: Frontmatter;

  /**
   * The content of the Markdown file, representing the raw Markdown text.
   */
  readonly content: string;
}
