/**
 * @fileoverview Test for `counter-button.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it, expect, expectTypeOf } from 'vitest';
import { render } from 'vitest-browser-react';
import { CounterButton, type CounterButtonProps } from './counter-button.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('counter-button', () => {
  describe('unit', () => {
    it('Initial value without props should be `0`', async () => {
      const screen = await render(<CounterButton />);

      expect(screen.getByText('0번 눌렸어요')).toBeInTheDocument();
    });

    it('Initial value with `initialValue` props should be set properly', async () => {
      const screen = await render(<CounterButton initialValue={5} />);

      expect(screen.getByText('5번 눌렸어요')).toBeInTheDocument();
    });

    it('Clicking the button should increment the count', async () => {
      const screen = await render(<CounterButton />);

      await screen.getByRole('button').click();
      expect(screen.getByText('1번 눌렸어요')).toBeInTheDocument();

      await screen.getByRole('button').click();
      expect(screen.getByText('2번 눌렸어요')).toBeInTheDocument();

      await screen.getByRole('button').click();
      expect(screen.getByText('3번 눌렸어요')).toBeInTheDocument();
    });
  });

  describe('type', () => {
    it('`CounterButtonProps` should have correct types', () => {
      expectTypeOf<CounterButtonProps>().toEqualTypeOf<{
        initialValue?: number;
      }>();
    });
  });
});
