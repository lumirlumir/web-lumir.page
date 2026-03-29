/**
 * @fileoverview Test for `use-toggle.ts`
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';
import { useToggle } from './use-toggle.js';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });

function ToggleHarness({ initialValue = false }: { initialValue?: boolean }) {
  const [value, toggle] = useToggle(initialValue);

  return (
    <>
      <output data-testid="value">{value ? 'true' : 'false'}</output>
      <button type="button" onClick={toggle}>
        toggle
      </button>
    </>
  );
}

const mountedContainers = new Set<HTMLDivElement>();
const describeIfBrowser = typeof document === 'undefined' ? describe.skip : describe;

async function renderToggleHarness(initialValue?: boolean) {
  const container = document.createElement('div');
  const root = createRoot(container);

  document.body.append(container);
  mountedContainers.add(container);

  await act(async () => {
    root.render(<ToggleHarness initialValue={initialValue} />);
  });

  return {
    button: container.querySelector('button'),
    root,
    value: container.querySelector('[data-testid="value"]'),
  };
}

afterEach(() => {
  for (const container of mountedContainers) {
    container.remove();
  }

  mountedContainers.clear();
});

// --------------------------------------------------------------------------------
// Test
// --------------------------------------------------------------------------------

describeIfBrowser('use-toggle', () => {
  it('should initialize with the default value false', async () => {
    const { root, value } = await renderToggleHarness();

    expect(value?.textContent).toBe('false');

    await act(async () => {
      root.unmount();
    });
  });

  it('should initialize with the provided value true', async () => {
    const { root, value } = await renderToggleHarness(true);

    expect(value?.textContent).toBe('true');

    await act(async () => {
      root.unmount();
    });
  });

  it('should toggle value when toggle is called', async () => {
    const { button, root, value } = await renderToggleHarness(false);

    expect(button).not.toBeNull();
    expect(value?.textContent).toBe('false');

    await act(async () => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(value?.textContent).toBe('true');

    await act(async () => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(value?.textContent).toBe('false');

    await act(async () => {
      root.unmount();
    });
  });
});
