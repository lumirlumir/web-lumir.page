/**
 * @fileoverview Layout.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Article from '@/components/layouts/Article';
import Nav from '@/components/layouts/Nav';
import Section from '@/components/layouts/Section/Section';
import Giscus from '@/components/section/Giscus';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default function Layout({ children }) {
  return (
    <>
      <Article>
        {children}
        <Section>
          <Giscus />
        </Section>
      </Article>
      <Nav />
    </>
  );
}
