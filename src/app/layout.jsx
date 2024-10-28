import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';

import ThemeProvider from '@/components/common/ThemeProvider';
import ThemeScript from '@/components/common/ThemeScript';

import Aside from '@/components/layouts/Aside';
import Body from '@/components/layouts/Body';
import Header from '@/components/layouts/Header';
import Main from '@/components/layouts/Main';

import Categories from '@/components/aside/Categories';
import Links from '@/components/aside/Links';
import Profile from '@/components/aside/Profile/Profile';

import DarkModeToggle from '@/components/header/DarkModeToggle';
import Title from '@/components/header/Title';

import { GOOGLE_GA_ID } from '@/constants';
import { getGithubUsers } from '@/utils/fetch';

import '@/styles/global.scss';

export async function generateMetadata() {
  const { bio, name } = await getGithubUsers();

  return {
    title: {
      template: `%s | ${name}`,
      default: name,
    },
    description: bio,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko" data-theme="dark">
      <ThemeProvider>
        <Body>
          <ThemeScript />

          <Header>
            <Title />
            <DarkModeToggle />
          </Header>
          <Aside>
            <Profile />
            <Links />
            <Categories />
          </Aside>
          <Main>{children}</Main>

          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics gaId={GOOGLE_GA_ID} />
        </Body>
      </ThemeProvider>
    </html>
  );
}
