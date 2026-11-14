import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { root } from '../scripts/artifact.mjs';

test('artifact verification rejects stale source, altered bundles and inconsistent release metadata', async t => {
  // Isolated fixture: never mutate the checkout or depend on a prior build.
  const folder = await mkdtemp(path.join(tmpdir(), 'spa-artifact-'));
  t.after(() => rm(folder, { recursive: true, force: true }));
  for (const name of ['scripts', 'src']) await cp(path.join(root, name), path.join(folder, name), { recursive: true });
  for (const name of ['package.json', 'package-lock.json', 'rollup.config.js', 'hacs.json', 'LICENSE', 'CHANGELOG.md']) {
    await cp(path.join(root, name), path.join(folder, name));
  }
  await mkdir(path.join(folder, 'dist'));
  const pkg = JSON.parse(await readFile(path.join(folder, 'package.json'), 'utf8'));
  const bundle = `/*! Spa Monitor Card v${pkg.version} */\n// spa-monitor-card spa-monitor-card-editor\n`;
  await writeFile(path.join(folder, pkg.main), bundle);
  const run = args => spawnSync(process.execPath, args, { cwd: folder, encoding: 'utf8' });
  const record = () => {
    const result = run(['--input-type=module', '-e', "import {manifest} from './scripts/artifact.mjs'; import {writeFile} from 'node:fs/promises'; await writeFile('dist/build-manifest.json', JSON.stringify(await manifest()));"]);
    assert.equal(result.status, 0, result.stderr);
  };
  const verify = (tag, ok, reason) => {
    const result = run(['scripts/verify-artifact.mjs', ...(tag ? [tag] : [])]);
    assert.equal(result.status === 0, ok, result.stderr);
    if (reason) assert.match(result.stderr, reason);
  };
  record();
  verify(`v${pkg.version}`, true);
  assert.ok((await readFile(path.join(folder, 'dist/release-notes.md'), 'utf8')).trim());
  verify('v99.0.0', false, /Release tag/);
  await writeFile(path.join(folder, pkg.main), bundle + '// altered\n');
  verify(null, false, /bundle or build inputs changed/);
  await writeFile(path.join(folder, pkg.main), bundle);
  await mkdir(path.join(folder, 'src/new-module'));
  await writeFile(path.join(folder, 'src/new-module/example.js'), '// new input\n');
  verify(null, false, /bundle or build inputs changed/);
  await writeFile(path.join(folder, 'hacs.json'), '{"filename":"wrong.js"}');
  record();
  verify(null, false, /wrong.js/);
  await cp(path.join(root, 'hacs.json'), path.join(folder, 'hacs.json'));
  await writeFile(path.join(folder, 'CHANGELOG.md'), '# Missing release notes\n');
  record();
  verify(`v${pkg.version}`, false, /Missing changelog/);
});
