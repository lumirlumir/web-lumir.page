/**
 * @fileoverview Layout.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Article from '@/components/layouts/Article';
import Nav from '@/components/layouts/Nav';
import Sort from '@/components/nav/Sort';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <>
      <Article>{children}</Article>
      <Nav>
        <Sort />
      </Nav>
    </>
  );
}
