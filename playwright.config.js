import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['json', { outputFile: 'test-results/browser.json' }]],
  use: {
    browserName: 'chromium',
    // Optional locally installed browser; CI installs the pinned Chromium build.
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    viewport: { width: 900, height: 700 },
    trace: 'retain-on-failure',
  },
});
