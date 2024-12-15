import {expect, Page, test} from "@playwright/test";
import HomePage from "../../pageobjects/teamandpersonal/home-page";
import Header from "../../pageobjects/teamandpersonal/header";

test.describe('ContactPage', () => {
  test.describe.configure({mode: 'serial'});

  let page: Page;

  test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await new HomePage(page).goto();
    await new Header(page).openContact();
  });

  test('Team&Personal option navigates to Home page', async () => {
    expect(page.url()).toBe('https://teamandpersonal.pl/kontakt/');
  });
});
