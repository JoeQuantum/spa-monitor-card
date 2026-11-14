import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const digest = value => createHash('sha256').update(value).digest('hex');
export const readJson = async name => JSON.parse(await readFile(path.join(root, name), 'utf8'));

async function sourceFiles(folder = 'src') {
  const files = [];
  for (const entry of await readdir(path.join(root, folder), { withFileTypes: true })) {
    const file = `${folder}/${entry.name}`;
    if (entry.isDirectory()) files.push(...await sourceFiles(file));
    else files.push(file);
  }
  return files;
}

export async function manifest() {
  const pkg = await readJson('package.json');
  const files = [
    'package.json', 'package-lock.json', 'rollup.config.js', 'LICENSE', 'hacs.json', 'CHANGELOG.md',
    'scripts/artifact.mjs', 'scripts/verify-artifact.mjs',
    ...await sourceFiles(),
  ].sort();
  const inputs = {};
  for (const file of files) inputs[file] = digest(await readFile(path.join(root, file)));
  return {
    schema: 1, package: pkg.name, version: pkg.version,
    filename: path.basename(pkg.main),
    sha256: digest(await readFile(path.join(root, pkg.main))), inputs,
  };
}

export function releaseNotes(changelog, version) {
  if (!/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(version)) throw new Error('Invalid package version');
  const heading = `## [${version}]`;
  const lines = changelog.split('\n');
  const start = lines.findIndex(line => line === heading || line.startsWith(heading + ' '));
  if (start < 0) throw new Error(`Missing changelog section for ${version}`);
  const end = lines.findIndex((line, i) => i > start && line.startsWith('## '));
  const notes = lines.slice(start + 1, end < 0 ? undefined : end).join('\n').trim();
  if (!notes) throw new Error(`Missing changelog section for ${version}`);
  return notes + '\n';
}
