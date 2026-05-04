/**
 * @fileoverview Typewriter hook.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

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
  onWriteComplete?: (() => void) | undefined;

  /**
   * Callback function that is called when erasing is complete.
   * @default undefined
   */
  onEraseComplete?: (() => void) | undefined;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Simple Typewriter Effect hook.
 *
 * @example
 * ```tsx
 * import { useTypewriter } from '@lumir/react-kit/hooks';
 *
 * function Component() {
 *   const [currentText] = useTypewriter({
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
}: UseTypewriterOptions): readonly [currentText: string] {
  const [currentText, setCurrentText] = useState<string>('');
  const [mode, setMode] = useState<'write' | 'erase'>('write');

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (pause) {
      return undefined;
    }

    /** Minimal helper to emulate `setTimeout` with rAF(requestAnimationFrame) */
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

          onWriteComplete?.();
        }, writePostDelay);
      } else {
        setTimeoutRaf(
          () => {
            setCurrentText(prev => prev + text[currentText.length]);
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

          onEraseComplete?.();
        }, erasePostDelay);
      } else {
        setTimeoutRaf(
          () => {
            setCurrentText(prev => prev.slice(0, prev.length - 1));
          },
          currentText.length === text.length ? erasePreDelay : eraseSpeed,
        );
      }
    }

    return () => {
      if (rafRef.current) {
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
    onWriteComplete,
    onEraseComplete,
    currentText,
    mode,
  ]);

  return [currentText] as const;
}
