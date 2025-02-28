import { expect, Page, test } from '@playwright/test';
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
} from '../types/header.types';
import HomePage from '../home/home-page';
import AboutPage from '../about/about-page';
import ContactPage from '../contact/contact-page';
import IntegrationTripsPage from '../integration-trips/integration-trips-page';
import playwrightConfig from '../../../playwright.config';
import TeamBuildingPage from '../team-building/team-building-page';
import TrainingsPage from '../trainings/trainings-page';
import EventsPage from '../events/events-page';

export type HomeNavigationAction = 'Logo' | 'Menu';

export default class Header {
  constructor(
    readonly page: Page,
    private readonly logo = page.locator('a.home-link'),
    private readonly phone = page.locator('.topka-tel', {
      hasText: '+48 660 22 77 22'
    }),
    private readonly mail = page.locator('.topka-mail', {
      hasText: 'biuro@teamandpersonal.pl'
    }),
    private readonly mainMenu = page.locator('#primary-menu'),
    private readonly subMenu = page.locator('.sub-menu')
  ) {}

  checkPhoneLink = async (href: string) =>
    expect.soft(this.phone).toHaveAttribute('href', href);

  checkEmailLink = async (href: string) =>
    expect.soft(this.mail.getByRole('link')).toHaveAttribute('href', href);

  checkSocialMediaIcon = async (sm: SocialMedia, url: string) => {
    const icon = this.page.locator(`a.topka-${sm}`);
    await expect.soft(icon).toHaveAttribute('href', url);
    await expect.soft(icon).toHaveAttribute('target', '_blank');
  };

  checkMainMenuItems = async (expectedItems: MainMenuItem[]) => {
    const actualElements = this.mainMenu.locator('> li');
    await expect(actualElements).toHaveCount(expectedItems.length);
    for (const item of expectedItems) {
      const first = actualElements.locator('a', { hasText: item }).first();
      await expect(first, `Checking primary menu item: ${item}`).toBeVisible();
    }
  };

  openHomePageBy = async (action: HomeNavigationAction) => {
    return test.step(`Open Home page by ${action} click`, async () => {
      switch (action) {
        case 'Logo':
          await this.logo.click();
          break;
        case 'Menu':
          await this.clickMenuItem('Team&Personal');
          break;
        default:
          throw new Error(`Not implemented action: ${action}`);
      }
      return new HomePage(this.page);
    });
  };

  openAboutPage = async () => {
    return test.step('Open About page', async () => {
      await this.clickMenuItem('O firmie');
      return new AboutPage(this.page);
    });
  };

  openIntegrationTripsPage = async () => {
    return test.step('Open Integration Trips page', async () => {
      await this.clickMenuItem('Wyjazdy Integracyjne');
      const url = `${playwrightConfig.use.baseURL}/wyjazdy-integracyjne/`;
      await this.page.waitForURL(url);
      return new IntegrationTripsPage(this.page);
    });
  };

  openTeamBuildingPage = async () => {
    return test.step('Open Team Building page', async () => {
      await this.clickMenuItem('Team building');
      const url = `${playwrightConfig.use.baseURL}/team-building/`;
      await this.page.waitForURL(url);
      return new TeamBuildingPage(this.page);
    });
  };

  openTrainingsPage = async () => {
    return test.step('Open Trainings page', async () => {
      await this.clickMenuItem('Szkolenia');
      const url = `${playwrightConfig.use.baseURL}/szkolenia/`;
      await this.page.waitForURL(url);
      return new TrainingsPage(this.page);
    });
  };

  openEventsPage = async () => {
    return test.step('Open Events page', async () => {
      await this.clickMenuItem('Eventy');
      const url = `${playwrightConfig.use.baseURL}/eventy/`;
      await this.page.waitForURL(url);
      return new EventsPage(this.page);
    });
  };

  openContactPage = async () => {
    return test.step('Open Contact page', async () => {
      await this.clickMenuItem('Kontakt');
      return new ContactPage(this.page);
    });
  };

  clickMenuItem = async (item: MainMenuItem) => {
    const hover = await this.hoverMenuItem(item);
    await hover.click();
  };

  hoverMenuItem = async (item: MainMenuItem) => {
    const locator = this.mainMenu
      .getByRole('link', { exact: true })
      .filter({ hasText: item })
      .first();
    await locator.hover();
    return locator;
  };

  hoverSubMenuItem = async (
    item: IntegrationTripType | TeamBuildingType | TrainingType | EventType
  ) => {
    await this.mainMenu
      .filter({ has: this.subMenu })
      .getByRole('link', { exact: true })
      .filter({ hasText: item })
      .first()
      .hover();
  };

  clickEndMenuItem = async (
    item:
      | IntegrationTripIndoorType
      | IntegrationTripOutdoorType
      | CityGameType
      | FieldGameType
      | TeamBuildingIndoorType
      | TeamBuildingOutdoorType
      | ArtisticType
      | CSRType
      | IntegrativeTrainingType
      | DevelopmentTrainingType
      | CoachingType
      | TeamCoachingType
      | EventIndoorType
      | EventOutdoorType
      | PicnicType
      | ConferenceType
  ) => {
    await this.mainMenu
      .filter({ has: this.subMenu })
      .filter({ has: this.subMenu })
      .getByRole('link', { exact: true })
      .filter({ hasText: item })
      .first()
      .click();
  };
}
