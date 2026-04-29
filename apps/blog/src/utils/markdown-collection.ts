/**
 * @fileoverview Defines a structured collection of Markdown files organized by `slug` and `category`.
 * @see https://webpack.js.org/guides/dependency-management/#importmetawebpackcontext
 * @see https://webpack.js.org/api/module-variables/#importmetawebpackcontext
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { frontmatter } from '@lumir/utils';
import { categoryKeys, type CategoryKey } from '@/data/category';
import { type VMarkdownFile } from '@/data/v-markdown-file';
import { isFrontmatter } from '@/utils/is-frontmatter';

// --------------------------------------------------------------------------------
// Typedef
// --------------------------------------------------------------------------------

type MarkdownCollectionCategory = Record<CategoryKey, VMarkdownFile[]>;
type MarkdownCollectionSlug = Record<string, VMarkdownFile>;

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

  #vMarkdownFiles: VMarkdownFile[] | null = null;
  #category: MarkdownCollectionCategory | null = null;
  #slug: MarkdownCollectionSlug | null = null;

  // ------------------------------------------------------------------------------
  // Private Method
  // ------------------------------------------------------------------------------

  /**
   * Lazily loads and processes Markdown files from the specified directory, extracting their frontmatter and content.
   *
   * Performance Optimization:
   * - The method uses lazy loading to defer the loading and processing of Markdown files until they are actually needed.
   *   This can improve the initial load time of the application, especially if there are many Markdown files.
   * - Once the Markdown files are loaded and processed, they are cached in the `#vMarkdownFiles` property.
   *   Subsequent calls to this method will return the cached data, avoiding redundant processing.
   */
  #ensureVMarkdownFiles(): VMarkdownFile[] {
    // If the Markdown files have already been loaded, skip the loading process.
    if (this.#vMarkdownFiles) {
      return this.#vMarkdownFiles;
    }

    const context = import.meta.webpackContext('../posts/docs', {
      recursive: false,
      regExp: /\.md$/,
      mode: 'sync',
    });

    const vMarkdownFiles: VMarkdownFile[] = context.keys().map(key => {
      const { data, content } = frontmatter(context(key));

      if (!isFrontmatter(data)) {
        throw new Error(
          `
Invalid frontmatter in Markdown file: \`${key}\`

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

      return {
        slug: key.replace(/^\.\//, '').replace(/\.md$/, ''),
        data,
        content,
      };
    });

    this.#vMarkdownFiles = vMarkdownFiles;

    return vMarkdownFiles;
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
      categoryKeys.map(categoryKey => [categoryKey, [] as VMarkdownFile[]]),
    ) as MarkdownCollectionCategory;

    this.#ensureVMarkdownFiles().forEach(vMarkdownFile => {
      vMarkdownFile.data.categories.forEach(category => {
        markdownCollectionCategory[category].push(vMarkdownFile);
      });
    });

    this.#category = markdownCollectionCategory;

    return markdownCollectionCategory;
  }

  /**
   * Lazily creates a mapping of slugs to their corresponding Markdown file metadata.
   */
  #ensureSlug(): MarkdownCollectionSlug {
    // If the slug mapping has already been created, skip the creation process.
    if (this.#slug) {
      return this.#slug;
    }

    const markdownCollectionSlug: MarkdownCollectionSlug = {};

    this.#ensureVMarkdownFiles().forEach(vMarkdownFile => {
      markdownCollectionSlug[vMarkdownFile.slug] = vMarkdownFile;
    });

    this.#slug = markdownCollectionSlug;

    return markdownCollectionSlug;
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
   *       content: '# Example Post\n\nThis is the content of the example post.',
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
   *       content: '# Example Post\n\nThis is the content of the example post.',
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
   *     content: '# Example Post\n\nThis is the content of the example post.',
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
 * Creates a class that represents a collection of Markdown files, organized by `slug` and `category`.
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

// --------------------------------------------------------------------------------
// TODO
// --------------------------------------------------------------------------------

/*
export async function loadMarkdownFile(slug: string): Promise<VMarkdownFile> {
  const markdownFile = (await import(`../posts/docs/${slug}.md`)) as string;
  const { data, content } = frontmatter(markdownFile);

  if (!isFrontmatter(data)) {
    throw new Error(
      `
Invalid frontmatter in Markdown file: \`${slug}.md\`

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

  return {
    slug,
    data,
    content,
  };
}
*/ // TODO
