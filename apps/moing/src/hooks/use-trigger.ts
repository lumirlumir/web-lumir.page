/**
 * @fileoverview use-trigger
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useState } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useTrigger() {
  const [triggerState, setTriggerState] = useState<boolean>(false);

  const trigger = () => {
    setTriggerState(true);
  };

  return {
    triggerState,
    trigger,
  };
}
