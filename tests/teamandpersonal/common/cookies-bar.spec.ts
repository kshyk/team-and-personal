import { test } from '@playwright/test';
import CookiesBar from '../../../pageobjects/teamandpersonal/common/cookies-bar';
import HomePage from '../../../pageobjects/teamandpersonal/home/home-page';

test.describe('CookiesBar', () => {
  test('Accept GDPR notice', async ({ browser }) => {
    const page = await browser.newPage();
    await new HomePage(page).goto();
    const cookiesBar = new CookiesBar(page);
    await cookiesBar.isVisible(true);
    await cookiesBar.checkNotice(
      'Używamy ciasteczek, aby zapewnić najlepszą jakość korzystania z naszej witryny.' +
        'Możesz dowiedzieć się więcej o tym, jakich ciasteczek używamy, lub wyłączyć je w ustawieniach.'
    );
    await cookiesBar.acceptCookies();
    await cookiesBar.isVisible(false);
  });
});
