/**
 * @fileoverview Test for `svg-wrapper.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import { SVGWrapper } from './svg-wrapper.js';

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describe('svg-wrapper', () => {
  it('should render an svg component with merged attrs and props', async () => {
    const Icon = SVGWrapper({
      attrs: {
        viewBox: '0 0 24 24',
        role: 'img',
      },
      children: <path d="M0 0h24v24H0z" />,
    });

    const screen = await render(
      <Icon
        aria-label="test icon"
        color="rgb(255, 0, 0)"
        data-testid="icon"
        size={24}
        style={{ display: 'block' }}
      />,
    );

    const svg = screen.container.querySelector('svg');

    expect(svg).not.toBeNull();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 24 24');
    expect(svg?.getAttribute('role')).toBe('img');
    expect(svg?.querySelectorAll('path')).toHaveLength(1);
    expect(svg?.getAttribute('aria-label')).toBe('test icon');
    expect(svg?.getAttribute('data-testid')).toBe('icon');
    expect(svg?.getAttribute('style')).toBe('color: rgb(255, 0, 0); display: block;');
    expect(svg?.getAttribute('stroke')).toBe('currentColor');
    expect(svg?.getAttribute('fill')).toBe('currentColor');
    expect(svg?.getAttribute('stroke-width')).toBe('0');
    expect(svg?.getAttribute('xmlns')).toBe('http://www.w3.org/2000/svg');
    expect(svg?.getAttribute('width')).toBe('24');
    expect(svg?.getAttribute('height')).toBe('24');
  });
});
