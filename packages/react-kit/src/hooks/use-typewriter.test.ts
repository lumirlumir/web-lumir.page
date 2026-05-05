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

  it("`mode`: when `mode` is set to `'write'`, initial return value should contain empty text", async () => {
    const { result } = await renderHook(() =>
      useTypewriter({ text: 'Hello', mode: 'write' }),
    );

    const [currentText] = result.current;

    assert.strictEqual(currentText, '');
  });

  it("`mode`: when `mode` is set to `'erase'`, initial return value should contain full text", async () => {
    const { result } = await renderHook(() =>
      useTypewriter({ text: 'Hello', mode: 'erase' }),
    );

    const [currentText] = result.current;

    assert.strictEqual(currentText, 'Hello');
  });

  it('`writeSpeed`: should respect `writeSpeed` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter({
        text: 'Hello',
        mode: 'write',
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

  it('`eraseSpeed`: should respect `eraseSpeed` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter({
        text: 'Hello',
        mode: 'erase',
        eraseSpeed: RAF_FRAME_DURATION_MS,
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, 'Hello');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    assert.strictEqual(secondText, 'Hell');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    assert.strictEqual(thirdText, 'Hel');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fourthText] = result.current;

    assert.strictEqual(fourthText, 'He');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [fifthText] = result.current;

    assert.strictEqual(fifthText, 'H');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [sixthText] = result.current;

    assert.strictEqual(sixthText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [seventhText] = result.current;

    // If we don't use `loop` option, the text should remain invisible
    // after erasing is complete and never write, so it should still be ''
    assert.strictEqual(seventhText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS * 10);
    });

    const [eighthText] = result.current;

    // If we don't use `loop` option, the text should remain invisible
    // after erasing is complete and never write, so it should still be ''
    assert.strictEqual(eighthText, '');
  });

  it('`writePreDelay`: should respect `writePreDelay` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter({
        text: 'Hello',
        mode: 'write',
        writePreDelay: RAF_FRAME_DURATION_MS * 2, // 2 frames delay before writing starts
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    // The text should still be empty because `writePreDelay` is 2 frames
    assert.strictEqual(secondText, '');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    // After advancing time by another frame (total 2 frames),
    // the first character should be written
    assert.strictEqual(thirdText, 'H');
  });

  it('`erasePreDelay`: should respect `erasePreDelay` option', async () => {
    const { act, result } = await renderHook(() =>
      useTypewriter({
        text: 'Hello',
        mode: 'erase',
        erasePreDelay: RAF_FRAME_DURATION_MS * 2, // 2 frames delay before erasing starts
      }),
    );

    const [firstText] = result.current;

    assert.strictEqual(firstText, 'Hello');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [secondText] = result.current;

    // The text should still be full because `erasePreDelay` is 2 frames
    assert.strictEqual(secondText, 'Hello');

    await act(async () => {
      await vi.advanceTimersByTimeAsync(RAF_FRAME_DURATION_MS);
    });

    const [thirdText] = result.current;

    // After advancing time by another frame (total 2 frames),
    // the first character should be erased
    assert.strictEqual(thirdText, 'Hell');
  });
});
