import { join } from 'path';

import Link from 'next/link';

import { DOCS, EXTENSION } from '@/constants/path';
import { readDirTree } from '@/utils/fs/dirTree';

/* Custom Declaration */
const { md, mdRegExp } = EXTENSION;

function renderDirTree(dirTree, basePath = '') {
  return (
    <ul>
      {dirTree.map(dirTreeNode => {
        const currPath = join(basePath, dirTreeNode.name);

        return (
          <li key={currPath}>
            {dirTreeNode.name.endsWith(md) ? (
              <Link href={`/posts/${currPath.replace(mdRegExp, '')}`}>
                {dirTreeNode.name.replace(mdRegExp, '')}
              </Link>
            ) : (
              <>
                <span>{dirTreeNode.name}</span>
                {renderDirTree(dirTreeNode.children, currPath)}
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* React Declaration */
export default async function Categories() {
  const dirTree = await readDirTree(DOCS);

  return <>{renderDirTree(dirTree)}</>;
}
