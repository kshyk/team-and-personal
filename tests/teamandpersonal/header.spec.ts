import {expect, test} from '@playwright/test';
import Header from '../../pageobjects/teamandpersonal/header';
import HomePage from '../../pageobjects/teamandpersonal/home-page';

test.describe('Header', () => {
  let homePage: HomePage
  let header: Header;

  test.beforeEach(async ({ page }) => {
    homePage = await new HomePage(page).goto();
    header = new Header(page);
  });

  test('Logo navigation', async ({ page }) => {
    await header.clickLogo();
    expect(page.url()).toBe('https://teamandpersonal.pl/');
  });

  test('Contact data: Phone number and Email address', async () => {
    await header.checkPhoneNumber('+48 660 22 77 22');
    await header.checkEmailAddress('biuro [at] teamandpersonal.pl');
    await header.checkEmailLink('mailto:biuro@teamandpersonal.pl');
  });

  test('Facebook icon navigation', async ({ context }) => {
    const pagePromise = context.waitForEvent('page');
    await header.clickSocialMediaIcon('facebook');
    const newPage = await pagePromise;
    expect(newPage.url()).toMatch(/^https:\/\/www\.facebook\.com\/TeamAndPersonal\/\?ref=bookmarks$/);
  });

  test('YouTube icon navigation', async ({ context }) => {
    const pagePromise = context.waitForEvent('page');
    await header.clickSocialMediaIcon('youtube');
    const newPage = await pagePromise;
    expect(decodeURIComponent(newPage.url())).toContain('https://www.youtube.com/channel/UCealDsXd2QtuW_on0wjSqtw')
  });

  test('LinkedIn icon navigation', async ({ context }) => {
    const pagePromise = context.waitForEvent('page');
    await header.clickSocialMediaIcon('linkedin');
    const newPage = await pagePromise;
    expect(newPage.url()).toMatch(/^https:\/\/www\.linkedin\.com\/company\/teamandpersonal\/$/);
  });

  test('Instagram icon navigation', async ({ context }) => {
    const pagePromise = context.waitForEvent('page');
    await header.clickSocialMediaIcon('instagram');
    const newPage = await pagePromise;
    expect(newPage.url()).toMatch(/^https:\/\/www\.instagram\.com\/teamandpersonal\/$/);
  });

  test('Pinterest icon navigation', async ({ context }) => {
    const pagePromise = context.waitForEvent('page');
    await header.clickSocialMediaIcon('pinterest');
    const newPage = await pagePromise;
    expect(newPage.url()).toContain('pinterest.com/teamandpersonal/');
  });

  test('Twitter icon navigation', async ({ context }) => {
    const pagePromise = context.waitForEvent('page');
    await header.clickSocialMediaIcon('twitter');
    const newPage = await pagePromise;
    expect(newPage.url()).toMatch(/^https:\/\/x\.com\/TeamAndPersonal$/);
  });
});
