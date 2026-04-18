/**
 * @fileoverview `useBooleanState` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useState, useCallback } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `useBooleanState` hook to manage a boolean state with utility functions.
 * @param defaultValue Initial boolean value. Default is `false`.
 * @returns A tuple containing the current boolean value, a function to set it to `true`, a function to set it to `false`, and a function to toggle it.
 * @example
 * ```tsx
 * import { useBooleanState } from 'react-kit/hooks';
 *
 * function MyComponent() {
 *   const [isVisible, show, hide, toggle] = useBooleanState(false);
 *   // Your component logic here...
 * }
 * ```
 */
export function useBooleanState(
  defaultValue = false,
): readonly [
  value: boolean,
  setTrue: () => void,
  setFalse: () => void,
  toggle: () => void,
] {
  const [bool, setBool] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  const toggle = useCallback(() => {
    setBool(b => !b);
  }, []);

  return [bool, setTrue, setFalse, toggle] as const;
}
