import { test } from '@playwright/test';
import HomePage from '../../../pageobjects/teamandpersonal/home/home-page';
import Header from '../../../pageobjects/teamandpersonal/common/header';

test.describe('EventsPage', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await new HomePage(page).goto();
    await new Header(page).openEventsPage();
  });

  test('Events data check', async () => {
    // TODO: test code
  });
});
