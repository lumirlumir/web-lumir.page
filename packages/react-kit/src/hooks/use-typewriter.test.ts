/**
 * @fileoverview Test for `use-typewriter.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, beforeEach, describe, it, vi } from 'vitest';
import { renderHook, type RenderHookResult } from 'vitest-browser-react';
import { useTypewriter, type UseTypewriterReturn } from './use-typewriter.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

type TypewriterHookRender = RenderHookResult<UseTypewriterReturn, unknown>;

beforeEach(() => {
  vi.useFakeTimers({
    now: 0,
    toFake: [
      'Date',
      'setTimeout',
      'clearTimeout',
      'requestAnimationFrame',
      'cancelAnimationFrame',
      'performance',
    ],
  });
});

afterEach(() => {
  vi.useRealTimers();
});

async function advanceAnimationFrameDelay(
  act: TypewriterHookRender['act'],
  milliseconds: number,
) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(milliseconds);
  });
}

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-typewriter', () => {
  it('Initial return value should contain empty text as the first array item', async () => {
    const { result } = await renderHook(() => useTypewriter({ text: 'Hello' }));

    assert.strictEqual(result.current[0], '');
  });

  it('Writing should respect pre delay, character speed, post delay, and completion callback', async () => {
    let writeCompleteCount = 0;

    const { act, result } = await renderHook(() =>
      useTypewriter({
        text: 'AB',
        writePreDelay: 32,
        writeSpeed: 16,
        writePostDelay: 32,
        onWriteComplete: () => {
          writeCompleteCount += 1;
        },
      }),
    );

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], '');
    assert.strictEqual(writeCompleteCount, 0);

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], 'A');
    assert.strictEqual(writeCompleteCount, 0);

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], 'AB');
    assert.strictEqual(writeCompleteCount, 0);

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(writeCompleteCount, 0);

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], 'AB');
    assert.strictEqual(writeCompleteCount, 1);
  });

  it('Looping should erase after write completion and start writing again after erase completion', async () => {
    let writeCompleteCount = 0;
    let eraseCompleteCount = 0;

    const { act, result } = await renderHook(() =>
      useTypewriter({
        text: 'AB',
        writePreDelay: 16,
        writeSpeed: 16,
        writePostDelay: 16,
        erasePreDelay: 16,
        eraseSpeed: 16,
        erasePostDelay: 16,
        loop: true,
        onWriteComplete: () => {
          writeCompleteCount += 1;
        },
        onEraseComplete: () => {
          eraseCompleteCount += 1;
        },
      }),
    );

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], 'A');

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], 'AB');

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], 'AB');
    assert.strictEqual(writeCompleteCount, 1);

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], 'A');

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], '');

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], '');
    assert.strictEqual(eraseCompleteCount, 1);

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], 'A');
  });

  it('Pause should stop progress and resume without resetting current text', async () => {
    const { act, rerender, result } = await renderHook(
      ({ pause }) =>
        useTypewriter({
          text: 'AB',
          writePreDelay: 16,
          writeSpeed: 16,
          pause,
        }),
      {
        initialProps: {
          pause: false,
        },
      },
    );

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], 'A');

    await rerender({
      pause: true,
    });
    await advanceAnimationFrameDelay(act, 64);
    assert.strictEqual(result.current[0], 'A');

    await rerender({
      pause: false,
    });
    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(result.current[0], 'AB');
  });

  it('Non-looping typewriter should leave completed text visible and never erase', async () => {
    let writeCompleteCount = 0;
    let eraseCompleteCount = 0;

    const { act, result } = await renderHook(() =>
      useTypewriter({
        text: 'AB',
        writePreDelay: 16,
        writeSpeed: 16,
        writePostDelay: 16,
        erasePreDelay: 16,
        eraseSpeed: 16,
        erasePostDelay: 16,
        loop: false,
        onWriteComplete: () => {
          writeCompleteCount += 1;
        },
        onEraseComplete: () => {
          eraseCompleteCount += 1;
        },
      }),
    );

    await advanceAnimationFrameDelay(act, 16);
    await advanceAnimationFrameDelay(act, 16);
    await advanceAnimationFrameDelay(act, 16);
    await advanceAnimationFrameDelay(act, 64);

    assert.strictEqual(result.current[0], 'AB');
    assert.strictEqual(writeCompleteCount, 1);
    assert.strictEqual(eraseCompleteCount, 0);
  });
});
