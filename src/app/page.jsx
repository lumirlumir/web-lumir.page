/**
 * @fileoverview Root page.
 */

// --------------------------------------------------------------------------------
// Import
// --------------------------------------------------------------------------------

import Article from '@/components/layouts/Article';

import { getGithubUsers } from '@/utils/fetch';

// --------------------------------------------------------------------------------
// Default Export
// --------------------------------------------------------------------------------

export default async function Page() {
  const { name } = await getGithubUsers();

  return <Article>{`Hello, It's ${name}'s blog!`}</Article>;
}
