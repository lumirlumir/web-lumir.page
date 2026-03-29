/**
 * @fileoverview Hook for managing boolean toggle state with a memoized toggle handler.
 * @see https://github.com/toss/react-simplikit/blob/main/packages/core/src/hooks/useToggle/useToggle.ts
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useCallback, useState } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Toggle a boolean state value between `true` and `false`.
 *
 * @param initialValue Initial boolean state. Defaults to `false`.
 * @returns Current boolean state and a function that toggles it.
 */
export function useToggle(initialValue = false) {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(() => {
    setState(previousState => !previousState);
  }, []);

  return [state, toggle] as const;
}
