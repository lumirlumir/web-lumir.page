import { GITHUB_REPO_OWNER } from '@/constants';

/**
 * Fetches GitHub user data.
 *
 * @async
 * @returns {Promise<Object>} A promise that resolves to a GitHub user data object.
 * @link https://docs.github.com/en/rest/users/users
 */
export async function getGithubUsers() {
  const response = await fetch(`https://api.github.com/users/${GITHUB_REPO_OWNER}`, {
    headers: {
      Authorization: `Bearer ${process.env.GH_PAT}`,
    },
    cache: 'force-cache', // https://nextjs.org/docs/app/guides/upgrading/version-15#fetch-requests
  });

  return response.json();
}
