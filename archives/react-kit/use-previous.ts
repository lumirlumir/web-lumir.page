/**
 * @fileoverview `usePrevious` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useRef, useEffect } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `usePrevious` hook to get the previous value of a state or prop.
 * @param value The current value to track.
 * @template T The type of the value.
 * @returns The previous value before the current render.
 * @example
 * ```tsx
 * import { usePrevious } from 'react-kit/hooks';
 *
 * function MyComponent({ count }: { count: number }) {
 *   const prevCount = usePrevious(count);
 *   // Your component logic here...
 * }
 * ```
 */
export function usePrevious<T>(value: T): T {
  const ref = useRef<T>(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
