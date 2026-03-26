/**
 * @fileoverview Test for `svg-wrapper.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { expect, test } from 'vitest';
import SVGWrapper from './svg-wrapper.js';

// --------------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------------

const browserTest =
  globalThis.__vitest_worker__?.ctx?.pool === 'browser' ? test : test.skip;

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

browserTest(
  'svg-wrapper should render an svg component with merged attrs and props',
  async () => {
    const { render } = await import('vitest-browser-react');

    const TestIcon = SVGWrapper({
      attrs: {
        viewBox: '0 0 24 24',
        role: 'img',
      },
      children: <path d="M0 0h24v24H0z" />,
    });

    const screen = await render(
      <TestIcon
        data-testid="icon"
        size={24}
        color="rgb(255, 0, 0)"
        style={{ display: 'block' }}
        aria-label="test icon"
      />,
    );

    const svg = screen.container.querySelector('svg');

    expect(svg).not.toBeNull();
    expect(svg?.querySelectorAll('path')).toHaveLength(1);
    expect(svg?.getAttribute('aria-label')).toBe('test icon');
    expect(svg?.getAttribute('fill')).toBe('currentColor');
    expect(svg?.getAttribute('height')).toBe('24');
    expect(svg?.getAttribute('role')).toBe('img');
    expect(svg?.getAttribute('stroke')).toBe('currentColor');
    expect(svg?.getAttribute('stroke-width')).toBe('0');
    expect(svg?.getAttribute('style')).toBe('color: rgb(255, 0, 0); display: block;');
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');

    await expect.element(screen.getByTestId('icon')).toBeVisible();
  },
);
