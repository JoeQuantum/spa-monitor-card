import { test } from 'node:test';
import assert from 'node:assert/strict';
import { releaseNotes } from '../scripts/artifact.mjs';

test('release notes select an exact version, not adjacent entries', () => {
  const text = '# Changelog\n\n## [0.1.10] - date\nwrong\n\n## [0.1.1] - date\n### Fixed\n\n- Correct fix.\n\n## [0.1.0]\nold\n';
  assert.equal(releaseNotes(text, '0.1.1'), '### Fixed\n\n- Correct fix.\n');
});
test('missing or empty notes block publication', () => {
  assert.throws(() => releaseNotes('## [0.1.1]\n\n## [0.1.0]\nold', '0.1.1'), /Missing/);
  assert.throws(() => releaseNotes('## [0.1.0]\nold', '0.1.1'), /Missing/);
  assert.throws(() => releaseNotes('', 'not-a-version'), /Invalid/);
});
