/**
 * @fileoverview Defines shared metadata types.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type JSX } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Represents shared metadata with localized display names and an associated React icon.
 */
export interface Meta {
  /**
   * The localized display name in English and Korean.
   */
  name: {
    /**
     * The display name in English.
     */
    en: string;

    /**
     * The display name in Korean.
     */
    ko: string;
  };

  /**
   * The React icon associated with the metadata item, represented as a JSX element.
   */
  reactIcons: JSX.Element;
}

/**
 * Represents shared metadata with an additional `order` property,
 * which can be used for sorting or displaying items in a specific sequence.
 */
export interface MetaWithOrder extends Meta {
  /**
   * The order of the item, which can be used for sorting or displaying items in a specific sequence.
   */
  order: number;
}
