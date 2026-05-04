/**
 * @fileoverview Typewriter component.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type HTMLAttributes } from 'react';
import { useTypewriter, type UseTypewriterOptions } from '../hooks/use-typewriter.js';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface TypewriterProps
  extends HTMLAttributes<HTMLSpanElement>, UseTypewriterOptions {
  /**
   * The value to use as the cursor. Set to `null` to disable.
   * @default '|'
   */
  cursor?: string | null;

  /**
   * The class name to apply to the cursor element.
   * @default 'cursor'
   */
  cursorClassName?: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * Simple Typewriter Effect component.
 *
 * TIP:
 * - Use `cursorClassName` to style the cursor (e.g., blinking effect).
 * - Use `style={{ whiteSpace: 'pre' }}` to support multiline text.
 *
 * @example
 * ```tsx
 * import { Typewriter } from '@lumir/react-kit/components';
 *
 * function Component() {
 *   return <Typewriter text="Hello, World!" />;
 * }
 * ```
 */
export function Typewriter({
  text,
  cursor = '|',
  cursorClassName = 'cursor',
  writeSpeed = 50,
  eraseSpeed = 50,
  writePreDelay = 0,
  erasePreDelay = 0,
  writePostDelay = 1_500,
  erasePostDelay = 1_500,
  loop = false,
  pause = false,
  onWriteComplete,
  onEraseComplete,
  ...props
}: TypewriterProps) {
  const typewriterOptions: UseTypewriterOptions = {
    text,
    writeSpeed,
    eraseSpeed,
    writePreDelay,
    erasePreDelay,
    writePostDelay,
    erasePostDelay,
    loop,
    pause,
  };

  if (onWriteComplete !== undefined) {
    typewriterOptions.onWriteComplete = onWriteComplete;
  }

  if (onEraseComplete !== undefined) {
    typewriterOptions.onEraseComplete = onEraseComplete;
  }

  const { currentText } = useTypewriter(typewriterOptions);

  return (
    <span {...props}>
      {currentText}
      {cursor === null ? null : (
        <span className={cursorClassName} aria-hidden="true">
          {cursor}
        </span>
      )}
    </span>
  );
}
