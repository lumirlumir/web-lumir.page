'use client';

import React, { useContext } from 'react';
import GiscusOriginal from '@giscus/react';

import { ThemeContext } from '@/components/common/ThemeProvider';
import { GITHUB_REPO_FULL_NAME } from '@/constants';

export default function Giscus() {
  const { theme } = useContext(ThemeContext);

  return (
    <GiscusOriginal
      repo={GITHUB_REPO_FULL_NAME}
      repoId="R_kgDOLa_QgA"
      category="comments"
      categoryId="DIC_kwDOLa_QgM4ChivI"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme}
      lang="ko"
      loading="lazy"
    />
  );
}
