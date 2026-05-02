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
 * Represents localized display names in English and Korean.
 */
export interface LocalizedName {
  /**
   * The display name in English.
   */
  readonly en: string;

  /**
   * The display name in Korean.
   */
  readonly ko: string;
}

/**
 * Represents shared metadata with localized display names and an associated React icon.
 */
export interface Meta {
  /**
   * The localized display name in English and Korean.
   */
  readonly name: LocalizedName;

  /**
   * The React icon associated with the metadata item, represented as a JSX element.
   */
  readonly reactIcons: JSX.Element;
}

/**
 * Represents shared metadata with an additional `order` property,
 * which can be used for sorting or displaying items in a specific sequence.
 */
export interface MetaWithOrder extends Meta {
  /**
   * The order of the item, which can be used for sorting or displaying items in a specific sequence.
   */
  readonly order: number;
}
