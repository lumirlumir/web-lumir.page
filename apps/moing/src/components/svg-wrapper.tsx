/**
 * @fileoverview svg-wrapper.
 * @see https://github.com/react-icons/react-icons/blob/v5.5.0/packages/react-icons/src/iconBase.tsx
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type ReactElement, type SVGAttributes } from 'react';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface SVGWrapperProps {
  attrs: {
    viewBox: string;
    [key: string]: string;
  };
  children: ReactElement;
}

export interface SVGProps extends SVGAttributes<SVGElement> {
  size?: string | number;
  color?: string;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function SVGWrapper({ attrs, children }: SVGWrapperProps) {
  return function SVG({
    size = '1em',
    color = 'currentColor',
    style = {},
    ...props
  }: SVGProps) {
    return (
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        xmlns="http://www.w3.org/2000/svg"
        {...attrs}
        height={size}
        width={size}
        style={{
          color,
          ...style,
        }}
        {...props}
      >
        {children}
      </svg>
    );
  };
}
