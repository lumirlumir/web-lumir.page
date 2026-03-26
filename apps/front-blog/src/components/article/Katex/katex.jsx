'use client';

import { useEffect, useRef } from 'react';
import renderMathInElement from 'katex/dist/contrib/auto-render';

import 'katex/dist/katex.min.css';

export default function Katex({ children, ...props }) {
  const katexRef = useRef();

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
