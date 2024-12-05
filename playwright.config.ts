import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    [
      'html',
      {
        open: 'never',
        outputFolder: 'test-results'
      }
    ],
    [
      'junit',
      {
        outputFile: 'test-results/junit-results.xml'
      }
    ]
  ],
  use: {
    baseURL: 'https://teamandpersonal.pl',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup']
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup']
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      dependencies: ['setup']
    },
    {
      name: 'msedge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
      dependencies: ['setup']
    },
  ],
});
