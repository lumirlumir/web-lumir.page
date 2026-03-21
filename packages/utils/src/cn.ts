/**
 * @fileoverview `cn` function.
 */

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export type CnArgs = (string | number | boolean | null | undefined)[];

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A simple utility function to concatenate class names.
 * @example
 *
 * ```ts
 * import { cn, type CnArgs } from '@lumir/utils';
 *
 * cn('class1', null, 'class2', false, 'class3'); // returns 'class1 class2 class3'
 * ```
 */
export function cn(...args: CnArgs): string {
  let tmp: CnArgs[number];
  let str = '';
  const len = args.length;

  for (let i = 0; i < len; i++) {
    if ((tmp = args[i])) {
      if (typeof tmp === 'string') {
        str += (str && ' ') + tmp;
      }
    }
  }

  return str;
}
