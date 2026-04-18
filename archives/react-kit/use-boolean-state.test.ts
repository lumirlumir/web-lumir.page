/**
 * @fileoverview Test for `use-boolean-state.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it, expect, expectTypeOf } from 'vitest';
import { renderHook } from 'vitest-browser-react';
import { useBooleanState } from './use-boolean-state.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('use-boolean-state', () => {
  describe('unit', () => {
    it('Default initial value should be `false` when not provided', async () => {
      const { result } = await renderHook(() => useBooleanState());

      expect(result.current[0]).toBe(false);
    });

    it('Default initial value should be as given when provided', async () => {
      const { result } = await renderHook(() => useBooleanState(true));

      expect(result.current[0]).toBe(true);
    });

    it('`setTrue` should set the value to `true`', async () => {
      const { result, act } = await renderHook(() => useBooleanState(false));

      expect(result.current[0]).toBe(false);

      await act(async () => {
        result.current[1](); // `setTrue`
      });

      expect(result.current[0]).toBe(true);
    });

    it('`setFalse` should set the value to `false`', async () => {
      const { result, act } = await renderHook(() => useBooleanState(true));

      expect(result.current[0]).toBe(true);

      await act(async () => {
        result.current[2](); // `setFalse`
      });

      expect(result.current[0]).toBe(false);
    });

    it('`toggle` should toggle the value', async () => {
      const { result, act } = await renderHook(() => useBooleanState(false));

      expect(result.current[0]).toBe(false);

      await act(async () => {
        result.current[3](); // `toggle`
      });

      expect(result.current[0]).toBe(true);

      await act(async () => {
        result.current[3](); // `toggle`
      });

      expect(result.current[0]).toBe(false);
    });
  });

  describe('type', () => {
    it('`useBooleanState` should have the correct type signature', () => {
      expectTypeOf<typeof useBooleanState>().toEqualTypeOf<
        // eslint-disable-next-line no-unused-vars -- Test purpose
        (defaultValue?: boolean) => readonly [boolean, () => void, () => void, () => void]
      >();
    });
  });
});
