import { expect, Page, test } from '@playwright/test';

export type OfferPuzzle =
  | 'Wyjazdy integracyjne'
  | 'Szkolenia'
  | 'Team building'
  | 'Eventy';

export default class HomePage {
  constructor(
    private readonly page: Page,
    private readonly welcomeText = page.locator('.kartka'),
    private readonly tuckmanTitle = page.locator('.reszta h3'),
    private readonly offers = {
      integrationTrips: page.locator('.wyjazdy-int-m'),
      trainings: page.locator('.szkolenia-m'),
      teamBuilding: page.locator('.team-build-m'),
      events: page.locator('.eventy-m')
    },
    private readonly references = {
      title: page.locator('.ref-tytul'),
      description: page.locator('.ref-tresc'),
      companyName: page.locator('.ref-imie'),
      date: page.locator('.ref-data')
    },
    private readonly referenceNavigator = page.locator(
      'ol.flex-control-paging'
    ),
    private readonly realizedTile = page.locator('.realizacja-link'),
    private readonly tags = page.locator('.chmura_tagow a')
  ) {}

  goto = async () => {
    return test.step('Goto Home page', async () => {
      await this.page.goto('/');
      return new HomePage(this.page);
    });
  };

  checkWelcomeText = async (expectedText: string) => {
    const welcomeText = await this.welcomeText.innerText();
    expect(welcomeText.replace(/\s+/g, ' ').trim()).toBe(expectedText);
  };

  checkTuckmanTitle = async (expectedTitle: string) => {
    expect(await this.tuckmanTitle.innerText()).toEqual(expectedTitle);
  };

  clickOfferPuzzle = async (offerPuzzle: OfferPuzzle) => {
    switch (offerPuzzle) {
      case 'Wyjazdy integracyjne':
        await this.offers.integrationTrips.click();
        break;
      case 'Szkolenia':
        await this.offers.trainings.click();
        break;
      case 'Team building':
        await this.offers.teamBuilding.click();
        break;
      case 'Eventy':
        await this.offers.events.click();
        break;
    }
  };

  checkOfferPuzzleTitle = async (
    offerPuzzle: OfferPuzzle,
    expectedTitle: string
  ) => {
    switch (offerPuzzle) {
      case 'Wyjazdy integracyjne':
        expect(await this.offers.integrationTrips.innerText()).toEqual(
          expectedTitle
        );
        break;
      case 'Szkolenia':
        expect(await this.offers.trainings.innerText()).toEqual(expectedTitle);
        break;
      case 'Team building':
        expect(await this.offers.teamBuilding.innerText()).toEqual(
          expectedTitle
        );
        break;
      case 'Eventy':
        expect(await this.offers.events.innerText()).toEqual(expectedTitle);
        break;
    }
  };

  checkOfferPuzzleDescription = async (
    offerPuzzle: OfferPuzzle,
    expectedDescription: string
  ) => {
    switch (offerPuzzle) {
      case 'Wyjazdy integracyjne':
        await expect(this.offers.integrationTrips.locator('span')).toHaveText(
          expectedDescription
        );
        break;
      case 'Szkolenia':
        await expect(this.offers.trainings.locator('span')).toHaveText(
          expectedDescription
        );
        break;
      case 'Team building':
        await expect(this.offers.teamBuilding.locator('span')).toHaveText(
          expectedDescription
        );
        break;
      case 'Eventy':
        await expect(this.offers.events.locator('span')).toHaveText(
          expectedDescription
        );
        break;
    }
  };

  checkReferenceTitle = async (index: number, expectedTitle: string) => {
    await expect(this.references.title.nth(index)).toHaveText(expectedTitle);
  };

  checkReferenceDescription = async (
    index: number,
    expectedDescription: string
  ) => {
    await expect(this.references.description.nth(index)).toHaveText(
      expectedDescription
    );
  };

  checkReferenceCompanyName = async (
    index: number,
    expectedCompanyName: string
  ) => {
    await expect(this.references.companyName.nth(index)).toHaveText(
      expectedCompanyName
    );
  };

  checkReferenceDate = async (index: number, expectedDate: string) => {
    await expect(this.references.date.nth(index)).toHaveText(expectedDate);
  };

  checkNumberOfReferences = async (expectedNumber: number) => {
    await expect(this.referenceNavigator.locator('li')).toHaveCount(
      expectedNumber
    );
  };

  checkNumberOfRealizedTiles = async (expectedNumber: number) => {
    await expect(this.realizedTile).toHaveCount(expectedNumber);
  };

  checkTagsExistence = async (expectedTags: string[]) => {
    const tags = await this.tags.allInnerTexts();
    expect(tags.length).toBeGreaterThan(40);
    expect(tags).toEqual(expect.arrayContaining(expectedTags));
  };
}
