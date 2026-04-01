/**
 * @fileoverview Hook for managing boolean toggle state.
 * @see https://github.com/toss/react-simplikit/blob/main/packages/core/src/hooks/useToggle/useToggle.ts
 */

/* eslint-disable import/prefer-default-export -- TODO: Refactor it later */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useState } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `useToggle` is a React hook that simplifies managing a boolean state.
 * It provides a function to toggle the state between `true` and `false`.
 *
 * @param initialValue The initial state value. Defaults to `false`.
 * @returns Current boolean state and a function that toggles it.
 * @example
 * ```tsx
 * import { useToggle } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [open, toggle] = useToggle(false);
 *
 *   return (
 *     <div>
 *       <p>Bottom Sheet state: {open ? 'opened' : 'closed'}</p>
 *       <button onClick={toggle}>Toggle</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useToggle(
  initialValue = false,
): readonly [state: boolean, toggle: () => void] {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setState(previousState => !previousState);
  }, []);

  return [state, toggle] as const;
}
