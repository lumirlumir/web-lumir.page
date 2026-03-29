/**
 * @fileoverview katex.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { useEffect, useRef, type HTMLAttributes, type PropsWithChildren } from 'react';
// @ts-expect-error - No type definitions available for `katex/dist/contrib/auto-render`.
import renderMathInElement from 'katex/dist/contrib/auto-render';
import 'katex/dist/katex.min.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type KatexProps = HTMLAttributes<HTMLDivElement>;

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Katex({ children, ...props }: PropsWithChildren<KatexProps>) {
  const katexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (katexRef.current) {
      renderMathInElement(katexRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
      });
    }
  }, [children]);

  return (
    <div ref={katexRef} {...props}>
      {children}
    </div>
  );
}
