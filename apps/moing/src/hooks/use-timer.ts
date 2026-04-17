/**
 * @fileoverview use-timer
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function useTimer(callbackOnTimerEnd: () => void) {
  const callbackOnTimerEndRef = useRef(callbackOnTimerEnd);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [secondState, setSecondState] = useState<number | null>(null);

  useEffect(() => {
    // @ts-expect-error -- TODO
    if (secondState < 0) {
      // @ts-expect-error -- TODO
      clearInterval(intervalRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- TODO
      setSecondState(null);
      if (callbackOnTimerEndRef.current) callbackOnTimerEndRef.current();
    }
  }, [secondState]);

  const resetTimer = (minute: number) => {
    setSecondState(minute * 60);

    // @ts-expect-error -- TODO
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      // @ts-expect-error -- TODO
      setSecondState(prevSecond => prevSecond - 1);
    }, 1000);
  };
  const stopTimer = () => {
    // @ts-expect-error -- TODO
    clearInterval(intervalRef.current);
  };
  const getTimer = () => {
    // @ts-expect-error -- TODO
    const minute = String(Math.floor((secondState / 60) % 60)).padStart(2, '0');
    // @ts-expect-error -- TODO
    const second = String(Math.floor(secondState % 60)).padStart(2, '0');
    return {
      minute: Number(minute),
      second: Number(second),
      timer: `${minute} : ${second}`,
    };
  };

  return {
    resetTimer,
    stopTimer,
    getTimer,
  };
}
