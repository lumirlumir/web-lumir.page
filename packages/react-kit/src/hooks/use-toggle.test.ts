/**
 * @fileoverview Test for `use-toggle.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useToggle } from './use-toggle.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-toggle', () => {
  it('Default initial value should be `false` when not provided', async () => {
    const { result } = await renderHook(() => useToggle());
    const [state, toggle] = result.current;

    assert.strictEqual(state, false);
    assert.strictEqual(typeof toggle, 'function');
  });

  it('Initial value should be `true` when provided', async () => {
    const { result } = await renderHook(() => useToggle(true));
    const [state, toggle] = result.current;

    assert.strictEqual(state, true);
    assert.strictEqual(typeof toggle, 'function');
  });

  it('`toggle` function should toggle the state value', async () => {
    const { act, result } = await renderHook(() => useToggle(false));

    const [firstState, toggle] = result.current;

    assert.strictEqual(firstState, false);

    await act(async () => {
      toggle();
    });

    const [secondState] = result.current;

    assert.strictEqual(secondState, true);

    await act(async () => {
      toggle();
    });

    const [thirdState] = result.current;

    assert.strictEqual(thirdState, false);
  });
});
