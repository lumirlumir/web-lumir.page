/**
 * @fileoverview Hook for managing typewriter text state.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export type TypewriterMode = 'write' | 'erase';

export interface UseTypewriterOptions {
  /**
   * Text to type out.
   */
  text: string;

  /**
   * The delay between each character when writing (milliseconds).
   * @default 50
   */
  writeSpeed?: number;

  /**
   * The delay between each character when erasing (milliseconds).
   * @default 50
   */
  eraseSpeed?: number;

  /**
   * Delay before starting to write (milliseconds).
   * @default 0
   */
  writePreDelay?: number;

  /**
   * Delay after finishing to write (milliseconds).
   * @default 1500
   */
  writePostDelay?: number;

  /**
   * Delay before starting to erase (milliseconds).
   * @default 0
   */
  erasePreDelay?: number;

  /**
   * Delay after finishing to erase (milliseconds).
   * @default 1500
   */
  erasePostDelay?: number;

  /**
   * Whether to keep looping or not.
   * @default false
   */
  loop?: boolean;

  /**
   * Temporarily pauses writing/erasing when set to `true`.
   * @default false
   */
  pause?: boolean;

  /**
   * Callback function that is called when writing is complete.
   * @default undefined
   */
  onWriteComplete?: () => void;

  /**
   * Callback function that is called when erasing is complete.
   * @default undefined
   */
  onEraseComplete?: () => void;
}

export interface UseTypewriterResult {
  /**
   * The currently visible text.
   */
  currentText: string;

  /**
   * Current typewriter mode.
   */
  mode: TypewriterMode;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * `useTypewriter` manages the state for a typewriter effect.
 *
 * It writes text one character at a time, optionally erases it, and can loop
 * between both modes.
 *
 * @param options Typewriter timing and callback options.
 * @returns Current text and mode.
 * @example
 * ```tsx
 * import { useTypewriter } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const { currentText } = useTypewriter({
 *     text: 'Hello, World!',
 *     writeSpeed: 50,
 *   });
 *
 *   return <span>{currentText}</span>;
 * }
 * ```
 */
export function useTypewriter({
  text,
  writeSpeed = 50,
  eraseSpeed = 50,
  writePreDelay = 0,
  erasePreDelay = 0,
  writePostDelay = 1_500,
  erasePostDelay = 1_500,
  loop = false,
  pause = false,
  onWriteComplete = undefined,
  onEraseComplete = undefined,
}: UseTypewriterOptions): UseTypewriterResult {
  const [currentText, setCurrentText] = useState<string>('');
  const [mode, setMode] = useState<TypewriterMode>('write');

  const rafRef = useRef<number | null>(null);
  const onWriteCompleteRef = useRef(onWriteComplete);
  const onEraseCompleteRef = useRef(onEraseComplete);

  useEffect(() => {
    onWriteCompleteRef.current = onWriteComplete;
  }, [onWriteComplete]);

  useEffect(() => {
    onEraseCompleteRef.current = onEraseComplete;
  }, [onEraseComplete]);

  useEffect(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (pause) {
      return undefined;
    }

    const setTimeoutRaf = (callback: () => void, delay: number) => {
      const base = performance.now();

      const step = (timestamp: number) => {
        if (timestamp - base >= delay) {
          rafRef.current = null;
          callback();
          return;
        }

        rafRef.current = requestAnimationFrame(step);
      };

      rafRef.current = requestAnimationFrame(step);
    };

    if (mode === 'write') {
      if (currentText.length === text.length) {
        setTimeoutRaf(() => {
          if (loop) {
            setMode('erase');
          }

          onWriteCompleteRef.current?.();
        }, writePostDelay);
      } else {
        setTimeoutRaf(
          () => {
            setCurrentText(previousText => previousText + text[currentText.length]);
          },
          currentText.length === 0 ? writePreDelay : writeSpeed,
        );
      }
    } else if (mode === 'erase') {
      if (currentText.length === 0) {
        setTimeoutRaf(() => {
          if (loop) {
            setMode('write');
          }

          onEraseCompleteRef.current?.();
        }, erasePostDelay);
      } else {
        setTimeoutRaf(
          () => {
            setCurrentText(previousText =>
              previousText.slice(0, previousText.length - 1),
            );
          },
          currentText.length === text.length ? erasePreDelay : eraseSpeed,
        );
      }
    }

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [
    text,
    writeSpeed,
    eraseSpeed,
    writePreDelay,
    erasePreDelay,
    writePostDelay,
    erasePostDelay,
    loop,
    pause,
    currentText,
    mode,
  ]);

  return {
    currentText,
    mode,
  };
}
