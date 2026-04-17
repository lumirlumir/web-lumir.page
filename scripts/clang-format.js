import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { clangFormatPath } from 'clang-format-node'; // eslint-disable-line import/no-extraneous-dependencies

const args = process.argv[2] === '--fix' ? ['-i'] : ['-n', '-Werror'];

const apps = join(import.meta.dirname, '..', 'apps', 'blog', 'src');
const archives = join(import.meta.dirname, '..', 'archives');

const appsPaths = readdirSync(apps, { recursive: true }).map(path => join(apps, path));
const archivesPaths = readdirSync(archives, { recursive: true }).map(path =>
  join(archives, path),
);

const paths = [...appsPaths, ...archivesPaths].filter(path =>
  /\.(?:c|cpp|h)$/i.test(path),
);

if (paths.length === 0) {
  console.log('No files found to format'); // eslint-disable-line no-console -- logging
  process.exit(0);
}

const { status } = spawnSync(clangFormatPath, [...args, ...paths], { stdio: 'inherit' });

if (status !== 0) {
  console.error('clang-format failed with status code', status); // eslint-disable-line no-console -- logging
  process.exit(status);
}
