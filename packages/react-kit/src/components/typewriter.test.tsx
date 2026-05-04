/**
 * @fileoverview Test for `typewriter.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, assert, beforeEach, describe, it, vi } from 'vitest';
import { render, renderHook, type RenderHookResult } from 'vitest-browser-react';
import { Typewriter } from './typewriter.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

type Act = RenderHookResult<undefined, unknown>['act'];

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

async function createAct() {
  const { act } = await renderHook(() => undefined);

  return act;
}

async function advanceAnimationFrameDelay(act: Act, milliseconds: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(milliseconds);
  });
}

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('typewriter', () => {
  it('Default cursor should render while text is typed', async () => {
    const act = await createAct();
    const screen = await render(<Typewriter text="A" writePreDelay={16} />);
    const typewriter = screen.container.querySelector('span');
    const cursor = typewriter?.querySelector('span');

    assert.isNotNull(typewriter);
    assert.isNotNull(cursor);
    assert.strictEqual(typewriter.textContent, '|');
    assert.strictEqual(cursor.className, 'cursor');
    assert.strictEqual(cursor.getAttribute('aria-hidden'), 'true');

    await advanceAnimationFrameDelay(act, 16);

    assert.strictEqual(typewriter.textContent, 'A|');
  });

  it('Custom cursor props and span attributes should be applied to rendered elements', async () => {
    const act = await createAct();
    const screen = await render(
      <Typewriter
        aria-label="typewriter text"
        className="typewriter"
        cursor="_"
        cursorClassName="caret"
        data-testid="typewriter"
        style={{ whiteSpace: 'pre' }}
        text="A"
        writePreDelay={16}
      />,
    );
    const typewriter = screen.container.querySelector('[data-testid="typewriter"]');
    const cursor = typewriter?.querySelector('span');

    assert.isNotNull(typewriter);
    assert.isNotNull(cursor);
    assert.strictEqual(typewriter.getAttribute('aria-label'), 'typewriter text');
    assert.strictEqual(typewriter.className, 'typewriter');
    assert.strictEqual(typewriter.getAttribute('style'), 'white-space: pre;');
    assert.strictEqual(cursor.className, 'caret');

    await advanceAnimationFrameDelay(act, 16);

    assert.strictEqual(typewriter.textContent, 'A_');
  });

  it('Null cursor should disable cursor rendering', async () => {
    const act = await createAct();
    const screen = await render(
      <Typewriter cursor={null} data-testid="typewriter" text="A" writePreDelay={16} />,
    );
    const typewriter = screen.container.querySelector('[data-testid="typewriter"]');

    assert.isNotNull(typewriter);
    assert.strictEqual(typewriter.textContent, '');
    assert.isNull(typewriter.querySelector('[aria-hidden="true"]'));

    await advanceAnimationFrameDelay(act, 16);

    assert.strictEqual(typewriter.textContent, 'A');
    assert.isNull(typewriter.querySelector('[aria-hidden="true"]'));
  });

  it('Timing options and callbacks should control writing and looping erase behavior', async () => {
    const act = await createAct();
    let writeCompleteCount = 0;
    let eraseCompleteCount = 0;

    const screen = await render(
      <Typewriter
        data-testid="typewriter"
        erasePostDelay={16}
        erasePreDelay={16}
        eraseSpeed={16}
        loop
        onEraseComplete={() => {
          eraseCompleteCount += 1;
        }}
        onWriteComplete={() => {
          writeCompleteCount += 1;
        }}
        text="AB"
        writePostDelay={16}
        writePreDelay={16}
        writeSpeed={16}
      />,
    );
    const typewriter = screen.container.querySelector('[data-testid="typewriter"]');

    assert.isNotNull(typewriter);
    assert.strictEqual(typewriter.textContent, '|');

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(typewriter.textContent, 'A|');

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(typewriter.textContent, 'AB|');

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(typewriter.textContent, 'AB|');
    assert.strictEqual(writeCompleteCount, 1);

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(typewriter.textContent, 'A|');

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(typewriter.textContent, '|');

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(typewriter.textContent, '|');
    assert.strictEqual(eraseCompleteCount, 1);
  });

  it('Pause option should stop component progress and resume without clearing text', async () => {
    const act = await createAct();
    const renderTypewriter = (pause: boolean) => (
      <Typewriter
        data-testid="typewriter"
        pause={pause}
        text="AB"
        writePreDelay={16}
        writeSpeed={16}
      />
    );

    const screen = await render(renderTypewriter(false));
    const typewriter = screen.container.querySelector('[data-testid="typewriter"]');

    assert.isNotNull(typewriter);

    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(typewriter.textContent, 'A|');

    await screen.rerender(renderTypewriter(true));
    await advanceAnimationFrameDelay(act, 64);
    assert.strictEqual(typewriter.textContent, 'A|');

    await screen.rerender(renderTypewriter(false));
    await advanceAnimationFrameDelay(act, 16);
    assert.strictEqual(typewriter.textContent, 'AB|');
  });
});
