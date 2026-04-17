/**
 * @fileoverview use-history-state
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useState } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useHistoryState<T>() {
  const [historyState, setHistoryState] = useState<T[]>([]);

  const addHistory = (val: T) => {
    setHistoryState(prevState => [...prevState, val]);
  };

  return {
    historyState,
    addHistory,
  };
}
