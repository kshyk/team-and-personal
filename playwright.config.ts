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
    ['blob'],
    process.env.CI ? ['github'] : ['list'],
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
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    timezoneId: 'Europe/Warsaw',
    video: {
      mode: 'retain-on-failure',
      size: { width: 1920, height: 1080 }
    }
  },
  projects: [
    {
      name: 'teardown',
      testMatch: /global\.teardown\.ts/
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['teardown']
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['teardown']
    },
    {
      name: 'chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      dependencies: ['teardown']
    },
    {
      name: 'msedge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
      dependencies: ['teardown']
    },
  ],
});
