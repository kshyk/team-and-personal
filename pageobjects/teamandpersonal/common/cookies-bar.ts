import { expect, Page } from '@playwright/test';

export default class CookiesBar {
  constructor(
    readonly page: Page,
    private readonly bar = page.locator('#moove_gdpr_cookie_info_bar'),
    private readonly notice = bar.locator('.moove-gdpr-cookie-notice'),
    private readonly acceptButton = bar.locator('button', {
      hasText: 'Akceptuj'
    })
  ) {}

  isVisible = async (isShown: boolean = true) =>
    expect(this.bar).toBeVisible({ visible: isShown });

  checkNotice = async (text: string) =>
    expect.soft(this.notice).toHaveText(text);

  acceptCookies = async () => {
    await this.acceptButton.click();
    await this.bar.waitFor({ state: 'hidden' });
  };
}
