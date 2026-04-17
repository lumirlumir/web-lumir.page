/**
 * @fileoverview use-scroll
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useRef } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `useScroll` is a React Hook that provides a smooth scrolling functionality.
 *
 * @example
 * ```jsx
 * import useScroll from 'path/to/use-scroll';
 *
 * function Component() {
 *   const { scrollRef, scroll } = useScroll<HTMLDivElement>();
 *
 *   return (
 *     <div>
 *       <button onClick={scroll}>Click to Scroll</button>
 *       <div ref={scrollRef}>Scroll Target</div>
 *     </div>
 *   );
 * }
 * ```
 */
export default function useScroll<T extends HTMLElement>() {
  const scrollRef = useRef<T | null>(null);

  const scroll = () =>
    scrollRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });

  return {
    scrollRef,
    scroll,
  };
}
