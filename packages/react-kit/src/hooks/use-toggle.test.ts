/**
 * @fileoverview Test for `use-toggle.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { afterEach, describe, expect, it } from 'vitest';
import { useToggle } from './use-toggle.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

const describeIfBrowser = typeof document === 'undefined' ? describe.skip : describe;

async function renderUseToggle(initialValue?: boolean) {
  const { renderHook } = await import('vitest-browser-react');

  return renderHook(({ value = false }: { value?: boolean } = {}) => useToggle(value), {
    initialProps: { value: initialValue },
  });
}

afterEach(async () => {
  if (typeof document === 'undefined') {
    return;
  }

  const { cleanup } = await import('vitest-browser-react');
  await cleanup();
});

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describeIfBrowser('use-toggle', () => {
  it('should initialize with the default value false', async () => {
    const { result, unmount } = await renderUseToggle();

    expect(result.current[0]).toBe(false);

    await unmount();
  });

  it('should initialize with the provided value true', async () => {
    const { result, unmount } = await renderUseToggle(true);

    expect(result.current[0]).toBe(true);

    await unmount();
  });

  it('should toggle value when toggle is called', async () => {
    const { result, act, unmount } = await renderUseToggle(false);

    expect(result.current[0]).toBe(false);

    await act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(true);

    await act(() => {
      result.current[1]();
    });

    expect(result.current[0]).toBe(false);

    await unmount();
  });
});
