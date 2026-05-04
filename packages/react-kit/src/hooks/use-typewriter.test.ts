/**
 * @fileoverview Test for `use-typewriter.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, beforeEach, describe, it, vi } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useTypewriter } from './use-typewriter.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * `1000ms / 60fps ≈ 16.67ms` per frame, so we can use `16ms`
 * as a close approximation for the duration of one animation frame.
 */
const RAF_FRAME_DURATION_MS = 16;

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-typewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      now: 0,
      toFake: ['requestAnimationFrame', 'cancelAnimationFrame', 'performance'],
    });
  });

  it('Initial return value should contain empty text as the first array item', async () => {
    const { result } = await renderHook(() => useTypewriter({ text: 'Hello' }));
    const [currentText] = result.current;

    assert.strictEqual(currentText, '');
  });

  it('Should respect `writeSpeed` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter({
        text: 'Hello',
        writeSpeed: RAF_FRAME_DURATION_MS,
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, 'H');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    assert.strictEqual(thirdText, 'He');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fourthText] = result.current;

    assert.strictEqual(fourthText, 'Hel');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fifthText] = result.current;

    assert.strictEqual(fifthText, 'Hell');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [sixthText] = result.current;

    assert.strictEqual(sixthText, 'Hello');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [seventhText] = result.current;

    // If we don't use `loop` option, the text should remain visible
    // after writing is complete and never erase, so it should still be 'Hello'
    assert.strictEqual(seventhText, 'Hello');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS * 10);
    });

    const [eighthText] = result.current;

    // If we don't use `loop` option, the text should remain visible
    // after writing is complete and never erase, so it should still be 'Hello'
    assert.strictEqual(eighthText, 'Hello');
  });
});
