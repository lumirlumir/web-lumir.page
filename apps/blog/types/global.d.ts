/**
 * @fileoverview Global type declarations.
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Helper type for CSS module classes.
 */
type CSSModuleClasses = Readonly<Record<string, string>>; // TODO: Refactor

// --------------------------------------------------------------------------------
// Module Declaration
// --------------------------------------------------------------------------------

/**
 * Global type declarations for CSS files.
 *
 * This file allows TypeScript to understand imports of CSS files,
 * providing type safety and autocompletion for class names.
 */
declare module '*.css';
declare module '*/css';

/**
 * Global type declarations for CSS modules.
 *
 * This file allows TypeScript to understand imports of CSS modules,
 * providing type safety and autocompletion for class names.
 */
declare module '*.module.css' {
  const classes: CSSModuleClasses;
  export default classes;
}

// TODO: Remove SCSS

/**
 * Global type declarations for SCSS files.
 *
 * This file allows TypeScript to understand imports of SCSS files,
 * providing type safety and autocompletion for class names.
 */
declare module '*.scss';
declare module '*/scss';

/**
 * Global type declarations for SCSS modules.
 *
 * This file allows TypeScript to understand imports of SCSS modules,
 * providing type safety and autocompletion for class names.
 */
declare module '*.module.scss' {
  const classes: CSSModuleClasses;
  export default classes;
}
