/**
 * @fileoverview Defines a structured collection of Markdown files organized by `slug` and `category`.
 * @see https://webpack.js.org/guides/dependency-management/#importmetawebpackcontext
 * @see https://webpack.js.org/api/module-variables/#importmetawebpackcontext
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { frontmatter, frontmatterData } from '@lumir/utils';
import { categoryKeys, type CategoryKey } from '@/data/category';
import { type Frontmatter } from '@/data/frontmatter';
import { type VMarkdownFileMeta, type VMarkdownFile } from '@/data/v-markdown-file';
import { isFrontmatter } from '@/utils/is-frontmatter';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type MarkdownCollectionMap = Map<string, VMarkdownFileMeta>;
type MarkdownCollectionSlug = Record<string, VMarkdownFileMeta>;
type MarkdownCollectionCategory = Record<CategoryKey, VMarkdownFileMeta[]>;

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

/**
 * Asserts that the provided data conforms to the expected `Frontmatter` structure.
 */
function assertFrontmatter(data: unknown, slug: string): Frontmatter {
  if (isFrontmatter(data)) {
    return data;
  }

  throw new Error(
    `
Invalid frontmatter in Markdown file: \`${slug}\`

Expected frontmatter format:
  - \`title: string\`
  - \`description: string\`
  - \`created: string\`
  - \`updated: string\`
  - \`categories: CategoryKey[]\`
  - \`references: string[]\`

Received data: \`${JSON.stringify(data, null, 2)}\`
`,
  );
}

// --------------------------------------------------------------------------------
// Class
// --------------------------------------------------------------------------------

/**
 * A class that represents a collection of Markdown files, organized by `slug` and `category`.
 */
class MarkdownCollection {
  // ------------------------------------------------------------------------------
  // Private Property
  // ------------------------------------------------------------------------------

  /** Source of truth: used as a cache */
  #map: MarkdownCollectionMap = new Map();
  /** View: using `#map` as source of truth */
  #slug: MarkdownCollectionSlug | null = null;
  /** View: using `#map` as source of truth */
  #category: MarkdownCollectionCategory | null = null;

  // ------------------------------------------------------------------------------
  // Private Method
  // ------------------------------------------------------------------------------

  /**
   * Lazily loads and processes Markdown files from the specified directory, extracting their frontmatter.
   *
   * Performance Optimization:
   * - The method uses lazy loading to defer the loading and processing of Markdown files until they are actually needed.
   *   This can improve the initial load time of the application, especially if there are many Markdown files.
   * - Once the Markdown files are loaded and processed, they are cached in the `#map` property.
   *   Subsequent calls to this method will return the cached data, avoiding redundant processing.
   */
  #ensureMap(): Map<string, VMarkdownFileMeta> {
    const context = import.meta.webpackContext('../posts/docs', {
      recursive: false,
      regExp: /\.md$/,
      mode: 'sync',
    });

    for (const key of context.keys()) {
      const slug = key.replace(/^\.\//, '').replace(/\.md$/, '');

      // If the Markdown file has already been processed and cached, skip the loading and processing steps.
      const cached = this.#map.get(slug);

      if (cached) {
        continue;
      }

      // If the Markdown file has not been processed, load and process it, then cache the result.
      const { data } = frontmatterData(context(key));
      const sanitizedData = assertFrontmatter(data, slug);

      this.#map.set(slug, {
        slug,
        data: sanitizedData,
      });
    }

    return this.#map;
  }

  /**
   * Lazily creates a mapping of slugs to their corresponding Markdown file metadata.
   */
  #ensureSlug(): MarkdownCollectionSlug {
    // If the slug mapping has already been created, skip the creation process.
    if (this.#slug) {
      return this.#slug;
    }

    const markdownCollectionSlug = Object.fromEntries(
      this.#ensureMap(),
    ) as MarkdownCollectionSlug;

    this.#slug = markdownCollectionSlug;

    return markdownCollectionSlug;
  }

  /**
   * Lazily creates a mapping of category keys to arrays of Markdown file metadata.
   */
  #ensureCategory(): MarkdownCollectionCategory {
    // If the category mapping has already been created, skip the creation process.
    if (this.#category) {
      return this.#category;
    }

    const markdownCollectionCategory = Object.fromEntries(
      categoryKeys.map(categoryKey => [categoryKey, [] as VMarkdownFileMeta[]]),
    ) as MarkdownCollectionCategory;

    this.#ensureMap().forEach(vMarkdownFile => {
      vMarkdownFile.data.categories.forEach(category => {
        markdownCollectionCategory[category].push(vMarkdownFile);
      });
    });

    this.#category = markdownCollectionCategory;

    return markdownCollectionCategory;
  }

  // ------------------------------------------------------------------------------
  // Public Method
  // ------------------------------------------------------------------------------

  /**
   * Asynchronously loads the metadata of a Markdown file by its slug, without loading its content.
   */
  async loadVMarkdownFileMeta(slug: string): Promise<VMarkdownFileMeta> {
    const cached = this.#map.get(slug);

    if (cached) {
      return cached;
    }

    const { data } = frontmatterData(
      // Markdown files are imported as raw strings because of a setting in `next.config.js`.
      (await import(`../posts/docs/${slug}.md`)).default as string,
    );
    const sanitizedData = assertFrontmatter(data, slug);

    const vMarkdownFileMeta: VMarkdownFileMeta = {
      slug,
      data: sanitizedData,
    };

    // Cache the metadata in `#map` for future reference.
    this.#map.set(slug, vMarkdownFileMeta);

    return vMarkdownFileMeta;
  }

  /**
   * Asynchronously loads a Markdown file by its slug, extracting its content and frontmatter metadata.
   */
  async loadVMarkdownFile(slug: string): Promise<VMarkdownFile> {
    const { data, content } = frontmatter(
      // Markdown files are imported as raw strings because of a setting in `next.config.js`.
      (await import(`../posts/docs/${slug}.md`)).default as string,
    );
    const sanitizedData = assertFrontmatter(data, slug);

    // Get a chance to cache the metadata in `#map` if it hasn't been cached already.
    if (!this.#map.has(slug)) {
      this.#map.set(slug, {
        slug,
        data: sanitizedData,
      });
    }

    return {
      slug,
      data: sanitizedData,
      content,
    };
  }

  // ------------------------------------------------------------------------------
  // Getter and Setter
  // ------------------------------------------------------------------------------

  /**
   * A record mapping each category key to an array of metadata for Markdown files that belong to that category.
   *
   * @example
   * ```ts
   * {
   *   javascript: [
   *     {
   *       slug: 'example-post',
   *       data: {
   *         title: 'Example Post',
   *         description: 'This is an example post.',
   *         created: '2024-01-01',
   *         updated: '2024-01-02',
   *         categories: ['javascript', 'markdown'],
   *       },
   *     },
   *     // ...more
   *   ],
   *   markdown: [
   *     {
   *       slug: 'example-post',
   *       data: {
   *         title: 'Example Post',
   *         description: 'This is an example post.',
   *         created: '2024-01-01',
   *         updated: '2024-01-02',
   *         categories: ['javascript', 'markdown'],
   *       },
   *     },
   *     // ...more
   *   ],
   *   // ...more
   * }
   * ```
   */
  get category(): MarkdownCollectionCategory {
    return this.#ensureCategory();
  }

  /**
   * Returns a list of category keys that have at least one associated Markdown file in the collection.
   *
   * @example
   * ```ts
   * import createMarkdownCollection from '@/utils/markdown-collection';
   *
   * const markdownCollection = createMarkdownCollection();
   * const nonEmptyCategories = markdownCollection.nonEmptyCategoryKeys;
   * console.log(nonEmptyCategories); // Output: ['javascript', 'markdown']
   * ```
   */
  get nonEmptyCategoryKeys(): CategoryKey[] {
    return categoryKeys.filter(categoryKey => this.category[categoryKey].length > 0);
  }

  /**
   * A record mapping each slug to its corresponding metadata.
   *
   * @example
   * ```ts
   * {
   *   'example-post': {
   *     slug: 'example-post',
   *     data: {
   *       title: 'Example Post',
   *       description: 'This is an example post.',
   *       created: '2024-01-01',
   *       updated: '2024-01-02',
   *       categories: ['javascript', 'markdown'],
   *       references: ['https://example.com'],
   *     },
   *   },
   *   // ...more
   * }
   * ```
   */
  get slug(): MarkdownCollectionSlug {
    return this.#ensureSlug();
  }
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A singleton instance of the `MarkdownCollection` class.
 */
let markdownCollection: MarkdownCollection | null = null;

/**
 * Creates and returns a singleton instance of the `MarkdownCollection` class
 * that represents a collection of Markdown files, organized by `slug` and `category`.
 *
 * @example
 * ```ts
 * import createMarkdownCollection from '@/utils/markdown-collection';
 *
 * const markdownCollection = createMarkdownCollection();
 * ```
 */
export default function createMarkdownCollection() {
  markdownCollection ??= new MarkdownCollection();

  return markdownCollection;
}
