import { test } from '@playwright/test';
import HomePage from '../../../pageobjects/teamandpersonal/home/home-page';
import Header from '../../../pageobjects/teamandpersonal/common/header';

test.describe('IntegrationTripsPage', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await new HomePage(page).goto();
    await new Header(page).openIntegrationTripsPage();
  });

  test('Integration Trips data check', async () => {
    // TODO: test code
  });
});
