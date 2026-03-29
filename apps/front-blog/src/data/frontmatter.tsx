/**
 * @fileoverview Defines the types and metadata for the frontmatter.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import {
  FaBook,
  FaRegCalendarPlus,
  FaRegCalendarXmark,
  FaTag,
  LuHeading1,
} from '@lumir/react-kit/svgs';
import { type CategoryKey } from './category';
import { type Meta } from './meta';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

/**
 * Represents the frontmatter of a Markdown document,
 * containing metadata such as `title`, `description`, `created` date, `updated` date, and `tags`.
 */
export interface Frontmatter {
  /**
   * The title of the Markdown document, providing a concise and descriptive name for the content.
   */
  title: string;

  /**
   * The description of the Markdown document, providing a brief summary or overview of its content.
   */
  description: string;

  /**
   * The created date of the Markdown document, indicating when the document was initially created or published.
   */
  created: string;

  /**
   * The updated date of the Markdown document, indicating when the document was last modified or updated.
   */
  updated: string;

  /**
   * The tags of the Markdown document, representing the categories associated with the content.
   */
  tags: CategoryKey[]; // TODO: Rename `tags` to `categories` later.
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * An object containing metadata for the frontmatter fields,
 * including their names in English and Korean, as well as associated React icons.
 */
export const frontmatterMeta = {
  title: {
    name: {
      en: 'Title',
      ko: '제목',
    },
    reactIcons: <LuHeading1 />,
  },
  description: {
    name: {
      en: 'Description',
      ko: '설명',
    },
    reactIcons: <FaBook />,
  },
  created: {
    name: {
      en: 'Created Date',
      ko: '생성한 날짜',
    },
    reactIcons: <FaRegCalendarPlus />,
  },
  updated: {
    name: {
      en: 'Updated Date',
      ko: '수정한 날짜',
    },
    reactIcons: <FaRegCalendarXmark />,
  },
  tags: {
    name: {
      en: 'Tags',
      ko: '태그',
    },
    reactIcons: <FaTag />,
  },
} as const satisfies Record<keyof Frontmatter, Meta>;
