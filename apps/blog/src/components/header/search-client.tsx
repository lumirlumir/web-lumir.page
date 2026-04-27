/**
 * @fileoverview Client-side search dialog powered by MiniSearch.
 */

// --------------------------------------------------------------------------------
// Directive
// --------------------------------------------------------------------------------

'use client';

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import MiniSearch from 'minisearch';
import { type Route } from 'next';
import { useRouter } from 'next/navigation';
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '@lumir/utils';
import styles from './search.module.css';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

export interface SearchDocument {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly created: string;
  readonly updated: string;
  readonly categories: string[];
  readonly references: string[];
  readonly categoriesText: string;
  readonly referencesText: string;
}

/**
 * Props for the `SearchClient` component.
 */
export interface SearchClientProps {
  /**
   * The maximum number of search results to display.
   *
   * @default 10
   */
  readonly maxResults?: number;

  /**
   * Translations for the search UI.
   */
  readonly translations?: {
    /**
     * Translations for the search button.
     */
    readonly button?: {
      /**
       * The aria-label for the search button.
       *
       * @default "Open search dialog"
       */
      readonly buttonAriaLabel?: string;

      /**
       * The icon to display on the search button.
       *
       * @default undefined
       */
      readonly buttonIcon?: ReactNode;

      /**
       * The text to display on the search button.
       *
       * @default "Search"
       */
      readonly buttonText?: string;
    };

    readonly dialog?: {
      /**
       * The aria-label for the search dialog.
       *
       * @default "Search"
       */
      readonly dialogAriaLabel?: string;

      /**
       * The icon to display in the search dialog.
       *
       * @default undefined
       */
      readonly dialogIcon?: ReactNode;
    };
  };

  // TODO: From here
  readonly documents: SearchDocument[];
}

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

function getPostHref(slug: string): Route {
  return `/posts/${slug}` as Route;
}

function isSearchDocument(
  document: SearchDocument | undefined,
): document is SearchDocument {
  return document !== undefined;
}

function Key({ children }: { children: string }) {
  return <kbd className={styles.key}>{children}</kbd>;
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

export default function SearchClient({
  maxResults = 10,
  translations: {
    button: {
      buttonIcon = undefined,
      buttonAriaLabel = 'Open search dialog',
      buttonText = 'Search',
    } = {},
    dialog: { dialogAriaLabel = 'Search', dialogIcon = undefined } = {},
  } = {},

  // TODO: From here
  documents,
}: SearchClientProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const resultsId = useId();
  const [query, setQuery] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const documentsById = useMemo(
    () => new Map(documents.map(document => [document.id, document])),
    [documents],
  );

  const miniSearch = useMemo(() => {
    const search = new MiniSearch<SearchDocument>({
      fields: [
        'title',
        'description',
        'created',
        'updated',
        'categoriesText',
        'referencesText',
        'slug',
      ],
      searchOptions: {
        boost: {
          title: 4,
          description: 2,
          categoriesText: 2,
          slug: 1.5,
        },
        fuzzy: 0.2,
        prefix: true,
      },
      storeFields: ['id'],
    });

    search.addAll(documents);

    return search;
  }, [documents]);

  const normalizedQuery = query.trim();

  const openDialog = useCallback(() => {
    const dialog = dialogRef.current;

    if (dialog === null) {
      return;
    }

    if (!dialog.open) {
      dialog.showModal();
    }

    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (normalizedQuery.length === 0) {
      return [];
    }

    return miniSearch
      .search(normalizedQuery)
      .slice(0, maxResults)
      .map(result => documentsById.get(String(result.id)))
      .filter(isSearchDocument);
  }, [documentsById, maxResults, miniSearch, normalizedQuery]);

  const activeResult = results[activeIndex];

  useEffect(() => {
    function onKeyDown(event: globalThis.KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openDialog();
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, [openDialog]);

  function closeDialog() {
    dialogRef.current?.close();
  }

  function resetSearch() {
    setQuery('');
    setActiveIndex(0);
    inputRef.current?.focus();
  }

  function navigateToResult(document: SearchDocument) {
    closeDialog();
    router.push(getPostHref(document.slug));
  }

  function onDialogClose() {
    setQuery('');
    setActiveIndex(0);
  }

  function onQueryChange(event: ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    setActiveIndex(0);
  }

  function onInputKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex(index => (index + 1) % results.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex(index => (index - 1 + results.length) % results.length);
    }

    if (event.key === 'Enter' && activeResult !== undefined) {
      event.preventDefault();
      navigateToResult(activeResult);
    }
  }

  return (
    <div className={cn(styles.search, 'custom-flex-center')}>
      <button
        type="button"
        className={styles.button}
        aria-label={buttonAriaLabel}
        onClick={openDialog}
      >
        <span className={styles['button-label']}>
          <span>{buttonIcon}</span>
          <span className={styles.placeholder}>{buttonText}</span>
        </span>
        <span className={styles.keys} aria-hidden="true">
          <Key>Ctrl</Key>
          <Key>K</Key>
        </span>
      </button>

      <dialog
        className={styles.dialog}
        ref={dialogRef}
        aria-label={dialogAriaLabel}
        onClose={onDialogClose}
        // Specifies the types of user actions that can be used to close the `<dialog>` element.
        // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#closedby
        closedby="any"
      >
        <div className={styles.modal}>
          <form className={styles.form} onSubmit={event => event.preventDefault()}>
            <div className={styles['search-box']}>
              <span>{dialogIcon}</span>
              <input
                ref={inputRef}
                className={styles.input}
                type="search"
                value={query}
                onChange={onQueryChange}
                onKeyDown={onInputKeyDown}
                placeholder="Search / 검색"
                aria-label="Search / 검색"
                aria-controls={resultsId}
              />
              {query.length > 0 ? (
                <button
                  type="button"
                  className={styles['reset-button']}
                  onClick={resetSearch}
                  aria-label="Clear the query / 검색 창 지우기"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <button
              type="button"
              className={styles['cancel-button']}
              onClick={closeDialog}
              aria-label="Cancel / 취소"
            >
              Cancel
            </button>
          </form>

          <div className={cn(styles.body, 'custom-scrollbar-y-bold')}>
            {normalizedQuery.length === 0 ? (
              <section className={styles.empty}>
                <h3 className={styles['empty-title']}>
                  Search docs metadata / 문서 메타데이터 검색
                </h3>
                <p className={styles['empty-description']}>
                  Titles, descriptions, dates, categories, references, and slugs are
                  indexed first. Body search can be added later.
                </p>
              </section>
            ) : null}

            {normalizedQuery.length > 0 && results.length === 0 ? (
              <section className={styles.empty}>
                <h3 className={styles['empty-title']}>
                  No results for / 검색 결과가 없습니다
                </h3>
                <p className={styles['empty-description']}>
                  &quot;{normalizedQuery}&quot;
                </p>
              </section>
            ) : null}

            {results.length > 0 ? (
              <section>
                <div className={styles.source}>Posts / 문서</div>
                <ul id={resultsId} className={styles.list}>
                  {results.map((document, index) => (
                    <li key={document.id} className={styles.item}>
                      <button
                        type="button"
                        className={styles.hit}
                        data-active={index === activeIndex}
                        onClick={() => navigateToResult(document)}
                      >
                        <span className={styles['hit-content']}>
                          <span className={styles['hit-title']}>{document.title}</span>
                          <span className={styles['hit-path']}>
                            blog / posts / {document.slug}
                          </span>
                          <span className={styles['hit-description']}>
                            {document.description}
                          </span>
                          <span className={styles.meta}>
                            <span className={styles.badge}>{document.created}</span>
                            <span className={styles.badge}>
                              Updated {document.updated}
                            </span>
                            {document.categories.map(category => (
                              <span key={category} className={styles.badge}>
                                {category}
                              </span>
                            ))}
                          </span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>

          <footer className={styles.footer}>
            <span className={styles.command}>
              <Key>Enter</Key>
              <span>Select / 선택</span>
            </span>
            <span className={styles.command}>
              <Key>↑</Key>
              <Key>↓</Key>
              <span>Navigate / 이동</span>
            </span>
            <span className={styles.command}>
              <Key>Esc</Key>
              <span>Close / 닫기</span>
            </span>
          </footer>
        </div>
      </dialog>
    </div>
  );
}
