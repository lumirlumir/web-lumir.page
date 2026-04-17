/**
 * A simple utility function to concatenate class names.
 * @param  {Array<string | number | boolean | null | undefined>} args
 * @returns {string}
 * @example
 *
 * ```js
 * import cn from 'path/to/cn';
 *
 * cn('class1', null, 'class2', false, 'class3'); // returns 'class1 class2 class3'
 * ```
 */
export default function cn(...args) {
  let tmp;
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
