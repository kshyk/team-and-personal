import { expect, Page } from '@playwright/test';

export type SocialMedia = 'facebook' | 'youtube' | 'linkedin' | 'instagram' | 'pinterest' | 'twitter';

export default class Header {
  constructor(
    readonly page: Page,
    private readonly logo = page.locator('a.home-link'),
    private readonly phone = page.locator('.topka-tel'),
    private readonly mail = page.locator('.topka-mail')
  ) {}

  clickLogo = async () => await this.logo.click();

  checkPhoneNumber = async (number: string) =>
    expect(this.phone).toContainText(number);

  checkEmailAddress = async (email: string) =>
    expect(this.mail).toContainText(email);

  checkEmailLink = async (href: string) =>
    expect(this.mail.getByRole("link")).toHaveAttribute('href', href);

  clickSocialMediaIcon = async (sm: SocialMedia) =>
    await this.page.locator(`.topka-${sm}`).click();
}
