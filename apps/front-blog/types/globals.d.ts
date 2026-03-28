/**
 * @fileoverview Global type declarations.
 */

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Helper type for CSS module classes.
 */
type CSSModuleClasses = Readonly<Record<string, string>>;

// --------------------------------------------------------------------------------
// Module Declaration
// --------------------------------------------------------------------------------

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
