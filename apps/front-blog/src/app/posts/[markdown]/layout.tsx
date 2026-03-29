/**
 * @fileoverview Layout.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { type PropsWithChildren } from 'react';
import Article from '@/components/layouts/article';
import Nav from '@/components/layouts/nav';
import Section from '@/components/layouts/section';
import Giscus from '@/components/section/giscus';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default function Layout({ children }: PropsWithChildren) {
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
