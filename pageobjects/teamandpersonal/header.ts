import {expect, Page} from '@playwright/test';
import {
  ArtisticType,
  CityGameType,
  CoachingType,
  ConferenceType,
  CSRType,
  DevelopmentTrainingType,
  EventIndoorType,
  EventOutdoorType,
  EventType,
  FieldGameType,
  IntegrationTripIndoorType,
  IntegrationTripOutdoorType,
  IntegrationTripType,
  IntegrativeTrainingType,
  MainMenuItem,
  PicnicType,
  SocialMedia,
  TeamBuildingIndoorType,
  TeamBuildingOutdoorType,
  TeamBuildingType,
  TeamCoachingType,
  TrainingType
} from "./types/header.types";
import HomePage from "./home-page";
import AboutPage from "./about-page";
import ContactPage from "./contact-page";

export default class Header {
  constructor(
    readonly page: Page,
    private readonly logo = page.locator('a.home-link'),
    private readonly phone = page.locator('.topka-tel'),
    private readonly mail = page.locator('.topka-mail'),
    private readonly mainMenu = page.locator('#primary-menu'),
    private readonly subMenu = page.locator('.sub-menu'),
  ) {
  }

  clickLogo = async () => {
    await this.logo.click();
    return new HomePage(this.page);
  }

  checkPhoneNumber = async (number: string) =>
    expect.soft(this.phone).toContainText(number);

  checkPhoneLink = async (href: string) =>
    expect.soft(this.phone).toHaveAttribute('href', href);

  checkEmailAddress = async (email: string) =>
    expect.soft(this.mail).toContainText(email);

  checkEmailLink = async (href: string) =>
    expect.soft(this.mail.getByRole("link")).toHaveAttribute('href', href);

  checkSocialMediaIcon = async (sm: SocialMedia, url: string) => {
    const icon = this.page.locator(`a.topka-${sm}`);
    await expect.soft(icon).toHaveAttribute('href', url);
    await expect.soft(icon).toHaveAttribute('target', '_blank');
  }

  checkMainMenuItems = async (expectedItems: MainMenuItem[]) => {
    const actualElements = this.mainMenu.locator('> li');
    await expect(actualElements).toHaveCount(expectedItems.length);
    for (const item of expectedItems) {
      const first = actualElements.locator('a', {hasText: item}).first();
      await expect(first, `Checking primary menu item: ${item}`).toBeVisible();
    }
  }

  openTeamAndPersonal = async () => {
    await this.clickMenuItem('Team&Personal');
    return new HomePage(this.page);
  }

  openAbout = async () => {
    await this.clickMenuItem('O firmie');
    return new AboutPage(this.page);
  }

  openContact = async () => {
    await this.clickMenuItem('Kontakt');
    return new ContactPage(this.page);
  }

  clickMenuItem = async (item: MainMenuItem) => {
    const hover = await this.hoverMenuItem(item);
    await hover.click();
  }

  hoverMenuItem = async (item: MainMenuItem) => {
    const locator = this.mainMenu.getByRole('link', {exact: true}).filter({hasText: item}).first();
    await locator.hover();
    return locator;
  }

  hoverSubMenuItem = async (item: IntegrationTripType | TeamBuildingType | TrainingType | EventType) => {
    await this.mainMenu.filter({has: this.subMenu}).getByRole('link', {exact: true}).filter({hasText: item}).first().hover();
  }

  clickEndMenuItem = async (item: IntegrationTripIndoorType | IntegrationTripOutdoorType | CityGameType | FieldGameType | TeamBuildingIndoorType | TeamBuildingOutdoorType | ArtisticType | CSRType | IntegrativeTrainingType | DevelopmentTrainingType | CoachingType | TeamCoachingType | EventIndoorType | EventOutdoorType | PicnicType | ConferenceType) => {
    await this.mainMenu.filter({has: this.subMenu}).filter({has: this.subMenu}).getByRole('link', {exact: true}).filter({hasText: item}).first().click();
  }
}
