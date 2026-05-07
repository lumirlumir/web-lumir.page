/**
 * @fileoverview `useBooleanState` hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useState } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `useBooleanState` hook to manage a boolean state with utility functions.
 *
 * @param initialValue The initial boolean state value. Default is `false`.
 * @returns A tuple containing the current boolean value, a function to set it to `true`, a function to set it to `false`, and a function to toggle it.
 * @example
 * ```tsx
 * import { useBooleanState } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [isVisible, showIsVisible, hideIsVisible, toggleIsVisible] = useBooleanState(false);
 *   // Your component logic here...
 * }
 * ```
 */
export function useBooleanState(
  initialValue = false,
): readonly [
  state: boolean,
  setTrue: () => void,
  setFalse: () => void,
  toggle: () => void,
] {
  const [state, setState] = useState<boolean>(initialValue);

  const setTrue = useCallback(() => {
    setState(true);
  }, []);

  const setFalse = useCallback(() => {
    setState(false);
  }, []);

  const toggle = useCallback(() => {
    setState(prevState => !prevState);
  }, []);

  return [state, setTrue, setFalse, toggle] as const;
}
