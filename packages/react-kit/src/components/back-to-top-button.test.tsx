/**
 * @fileoverview Test for `back-to-top-button.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, afterEach, describe, it, vi } from 'vitest';
import { render } from 'vitest-browser-react';
import { BackToTopButton } from './back-to-top-button.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('back-to-top-button', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render a button with no text content by default', async () => {
    const screen = await render(<BackToTopButton />);
    const button = screen.container.querySelector('button');

    assert.ok(button);
    assert.strictEqual(button.type, 'button');
    assert.strictEqual(button.textContent, '');
  });

  it('should pass through standard button attributes and custom children', async () => {
    const screen = await render(
      <BackToTopButton aria-label="Back to top" className="back-to-top-button">
        Up
      </BackToTopButton>,
    );
    const button = screen.container.querySelector('button');

    assert.ok(button);
    assert.strictEqual(button.getAttribute('aria-label'), 'Back to top');
    assert.strictEqual(button.className, 'back-to-top-button');
    assert.strictEqual(button.type, 'button');
    assert.strictEqual(button.textContent, 'Up');
  });

  it('clicking the button should scroll to the top with smooth behavior by default', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    const screen = await render(<BackToTopButton />);
    const button = screen.container.querySelector('button');

    assert.ok(button);

    button.click();

    assert.strictEqual(scrollTo.mock.calls.length, 1);
    assert.deepStrictEqual(scrollTo.mock.calls[0] as unknown[], [
      {
        top: 0,
        behavior: 'smooth',
      },
    ]);
  });

  it('custom options should override the default scroll behavior', async () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    const screen = await render(<BackToTopButton behavior="auto" top={100} />);
    const button = screen.container.querySelector('button');

    assert.ok(button);

    button.click();

    assert.strictEqual(scrollTo.mock.calls.length, 1);
    assert.deepStrictEqual(scrollTo.mock.calls[0] as unknown[], [
      {
        top: 100,
        behavior: 'auto',
      },
    ]);
  });
});
