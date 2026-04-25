/**
 * @fileoverview giscus.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import GiscusOriginal from '@giscus/react';
import { useThemeContext } from '@/components/common/theme-context';
import { GITHUB_REPO_FULL_NAME } from '@/constants';

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function Giscus() {
  const [theme] = useThemeContext();

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
