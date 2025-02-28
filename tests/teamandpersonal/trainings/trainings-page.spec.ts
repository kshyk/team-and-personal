import { test } from '@playwright/test';
import HomePage from '../../../pageobjects/teamandpersonal/home/home-page';
import Header from '../../../pageobjects/teamandpersonal/common/header';

test.describe('TrainingsPage', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    await new HomePage(page).goto();
    await new Header(page).openTrainingsPage();
  });

  test('Trainings data check', async () => {
    // TODO: test code
  });
});
