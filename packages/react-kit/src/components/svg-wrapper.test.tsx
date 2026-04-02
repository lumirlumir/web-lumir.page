/**
 * @fileoverview Test for `svg-wrapper.tsx`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { assert, describe, it } from 'vitest';
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

    assert.isNotNull(svg);
    assert.strictEqual(svg.getAttribute('viewBox'), '0 0 24 24');
    assert.strictEqual(svg.getAttribute('role'), 'img');
    assert.strictEqual(svg.querySelectorAll('path').length, 1);
    assert.strictEqual(svg.getAttribute('aria-label'), 'test icon');
    assert.strictEqual(svg.getAttribute('data-testid'), 'icon');
    assert.strictEqual(
      svg.getAttribute('style'),
      'color: rgb(255, 0, 0); display: block;',
    );
    assert.strictEqual(svg.getAttribute('stroke'), 'currentColor');
    assert.strictEqual(svg.getAttribute('fill'), 'currentColor');
    assert.strictEqual(svg.getAttribute('stroke-width'), '0');
    assert.strictEqual(svg.getAttribute('xmlns'), 'http://www.w3.org/2000/svg');
    assert.strictEqual(svg.getAttribute('width'), '24');
    assert.strictEqual(svg.getAttribute('height'), '24');
  });
});
