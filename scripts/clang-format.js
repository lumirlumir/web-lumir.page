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

spawnSync(clangFormatPath, [...args, ...paths], { stdio: 'inherit' });
