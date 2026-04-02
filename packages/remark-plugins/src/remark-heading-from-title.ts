/**
 * @fileoverview remark-heading-from-title.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import { remark } from 'remark';
import type { Heading, Root, RootContent } from 'mdast';

// --------------------------------------------------------------------------------
// Helper
// --------------------------------------------------------------------------------

const FRONTMATTER_NODE_TYPES = new Set(['yaml', 'toml']);

export interface RemarkHeadingFromTitleOptions {
  title: string;
}

function getHeadingFromTitle(title: string): Heading | undefined {
  if (!title.trim()) {
    return undefined;
  }

  const tree = remark().parse(`# ${title}`);
  const heading = tree.children.find(
    (node): node is Heading => node.type === 'heading' && node.depth === 1,
  );

  return heading;
}

function getHeadingInsertIndex(children: RootContent[]): number {
  return children.findIndex(node => !FRONTMATTER_NODE_TYPES.has(node.type));
}

// --------------------------------------------------------------------------------
// Export
// --------------------------------------------------------------------------------

/**
 * A remark plugin to prepend an H1 heading generated from the provided title.
 */
export function remarkHeadingFromTitle({ title }: RemarkHeadingFromTitleOptions) {
  return (tree: Root) => {
    const heading = getHeadingFromTitle(title);

    if (!heading) {
      return;
    }

    const insertIndex = getHeadingInsertIndex(tree.children);

    tree.children.splice(
      insertIndex >= 0 ? insertIndex : tree.children.length,
      0,
      heading,
    );
  };
}
