import { join } from 'node:path';

// Website
export const WEBSITE_NAME = 'blog.lumir.page';
export const WEBSITE_URL = `https://${WEBSITE_NAME}`;

// GitHub Repository, Ref: https://docs.github.com/en/rest/repos/repos
export const GITHUB_REPO_OWNER = 'lumirlumir';
export const GITHUB_REPO_NAME = `web-${WEBSITE_NAME}`;
export const GITHUB_REPO_FULL_NAME = `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;

// Path
export const PATH_DOCS = join(process.cwd(), 'src', 'posts', 'docs');

// Extension
export const EXT_MD = '.md';
export const EXT_MD_REGEXP = new RegExp(`${EXT_MD}$`, 'i');

// Google
export const GOOGLE_GA_ID = 'G-2G4YHTE048';
