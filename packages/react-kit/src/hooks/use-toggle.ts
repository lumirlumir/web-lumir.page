/**
 * @fileoverview Hook for managing boolean toggle state.
 * @see https://github.com/toss/react-simplikit/blob/main/packages/core/src/hooks/useToggle/useToggle.ts
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useState } from 'react';

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

  function toggle() {
    setState(previousState => !previousState);
  }

  return [state, toggle] as const;
}
