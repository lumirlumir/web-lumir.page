/**
 * @fileoverview Layout.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Article from '@/components/layouts/article';
import Nav from '@/components/layouts/nav';
import Sort from '@/components/nav/sort';

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
