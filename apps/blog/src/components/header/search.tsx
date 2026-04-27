/**
 * @fileoverview Server wrapper for doc-search.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { LmSearch } from '@lumir/react-kit/svgs';
import { type VMarkdownFile } from '@/data/v-markdown-file';
import { markdownCollectionSlug } from '@/utils/markdown-collection';
import { markdownToText } from '@/utils/markdown-to-text';
import SearchClient, { type SearchDocument } from './search-client';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Creates search documents from Markdown frontmatter only.
 * @param vMarkdownFiles The Markdown files to convert into search documents.
 */
async function createDocSearchDocuments(
  vMarkdownFiles: VMarkdownFile[],
): Promise<SearchDocument[]> {
  return Promise.all(
    vMarkdownFiles.map(
      async ({
        slug,
        data: { title, description, created, updated, categories, references },
      }) => ({
        id: slug,
        slug,
        title: await markdownToText(title),
        description: await markdownToText(description),
        created,
        updated,
        categories,
        references,
        categoriesText: categories.join(' '),
        referencesText: references.join(' '),
      }),
    ),
  );
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default async function DocSearch() {
  const documents = await createDocSearchDocuments(Object.values(markdownCollectionSlug));

  return (
    <SearchClient
      buttonIcon={
        <LmSearch aria-hidden="true" color="white" size={28} strokeWidth="1.5" />
      }
      maxResults={10}
      translations={{
        button: {
          buttonAriaLabel: 'Open search dialog / 검색 창 열기',
          buttonText: 'Search / 검색',
        },
      }}
      documents={documents}
    />
  );
}
