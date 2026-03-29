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
 * Represents a Virtual Markdown file, containing the `basename` (including extension), `content`, and `data` (frontmatter) of the Markdown document.
 */
export interface VMarkdownFile {
  /**
   * The basename of the Markdown file, including the extension (e.g., `example.md`).
   */
  basename: string;

  /**
   * The content of the Markdown file, representing the raw Markdown text.
   */
  content: string;

  /**
   * The data of the Markdown file, representing the frontmatter metadata defined in the `Frontmatter` interface.
   */
  data: Frontmatter;
}
