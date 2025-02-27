import {expect, Page, test} from '@playwright/test';
import Header from '../../pageobjects/teamandpersonal/header';
import HomePage from '../../pageobjects/teamandpersonal/home-page';
import {
  MainMenuItem
} from "../../pageobjects/teamandpersonal/types/header.types";

test.describe('Header', () => {
  test.describe.configure({mode: 'serial'});

  let page: Page;
  let header: Header;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await new HomePage(page).goto();
    header = new Header(page);
  });

  test('Logo navigation', async () => {
    await header.clickLogo();
    expect(page.url()).toBe('https://teamandpersonal.pl/');
  });

  test('Contact data: Phone number and Email address', async () => {
    await header.checkPhoneLink('tel:+48660227722');
    await header.checkEmailLink('mailto:biuro@teamandpersonal.pl');
  });

  test('Social Media icon links', async () => {
    await header.checkSocialMediaIcon('facebook', 'https://www.facebook.com/TeamAndPersonal/?ref=bookmarks');
    await header.checkSocialMediaIcon('youtube', 'https://www.youtube.com/channel/UCealDsXd2QtuW_on0wjSqtw');
    await header.checkSocialMediaIcon('linkedin', 'https://www.linkedin.com/company/teamandpersonal/');
    await header.checkSocialMediaIcon('instagram', 'https://www.instagram.com/teamandpersonal/');
    await header.checkSocialMediaIcon('pinterest', 'https://pl.pinterest.com/teamandpersonal/');
    await header.checkSocialMediaIcon('twitter', 'https://x.com/TeamAndPersonal');
  });

  test('Primary menu parent items', async () => {
    const mainMenuItems: MainMenuItem[] = [
      'Team&Personal',
      'O firmie',
      'Wyjazdy Integracyjne',
      'Team building',
      'Szkolenia',
      'Eventy',
      'Kontakt',
    ];
    await header.checkMainMenuItems(mainMenuItems);
  });
});
