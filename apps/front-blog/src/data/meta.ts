/**
 * @fileoverview TODO.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import type React from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Represents the metadata structure, including their names in English and Korean, as well as associated React icons.
 */
export interface Meta {
  /**
   * The name of the category in English and Korean.
   */
  name: {
    /**
     * The name of the category in English.
     */
    en: string;

    /**
     * The name of the category in Korean.
     */
    ko: string;
  };

  /**
   * The React icon associated with the category, represented as a JSX element.
   */
  reactIcons: React.JSX.Element;
}

/**
 * Represents the metadata structure with an additional `order` property,
 * which can be used for sorting or displaying categories in a specific sequence.
 */
export interface MetaWithOrder extends Meta {
  /**
   * The order of the category, which can be used for sorting or displaying categories in a specific sequence.
   */
  order: number;
}
