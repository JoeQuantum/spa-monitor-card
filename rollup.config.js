import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { readFile, writeFile } from 'node:fs/promises';
import { manifest, readJson, root } from './scripts/artifact.mjs';
import path from 'node:path';

const { version } = await readJson('package.json');
const license = await readFile(path.join(root, 'LICENSE'), 'utf8');

export default {
  input: 'src/spa-monitor-card.js',
  output: {
    file: 'dist/spa-monitor-card.js',
    format: 'es',
    banner: `/*! Spa Monitor Card v${version}\nDerived from wilsto/pool-monitor-card.\n\n${license.trim()}\n*/`,
  },
  plugins: [
    {
      name: 'card-version-and-provenance',
      transform(code, id) {
        if (id.endsWith('/src/spa-monitor-card.js')) {
          return { code: code.replace("'__CARD_VERSION__'", JSON.stringify(version)), map: null };
        }
      },
      async writeBundle() {
        await writeFile(path.join(root, 'dist/build-manifest.json'), JSON.stringify(await manifest(), null, 2) + '\n');
      },
    },
    resolve(),
    terser(),
  ],
};
