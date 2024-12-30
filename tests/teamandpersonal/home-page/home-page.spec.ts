import {Page, test} from "@playwright/test";
import HomePage, {
  OfferPuzzle
} from "../../../pageobjects/teamandpersonal/home-page";
import Header from "../../../pageobjects/teamandpersonal/header";
import * as fs from "node:fs";
import * as path from "node:path";

test.describe('HomePage', () => {
  test.describe.configure({mode: 'parallel'});

  let homePage: HomePage;

  test.beforeEach(async ({page}) => {
    homePage = await new HomePage(page).goto();
    await new Header(page).openTeamAndPersonal();
    await page.waitForURL('https://teamandpersonal.pl/');
  });

  test.describe('Tuckman Chart', async () => {
    test('Welcome text and title', async () => {
      await homePage.checkWelcomeText('Witamy na stronie Team&Personal, firmy specjalizującej się w budowaniu zespołów. ' +
        'Efektywny zespół to dzisiaj podstawa funkcjonowania firmy. Jednak zgromadzenie nawet największych indywidualnych talentów nie gwarantuje osiągnięcia sukcesu. ' +
        'Dlatego tworzenie efektu synergii to ważny efekt pracy szkoleniowo – rozwojowej. ' +
        'Proces budowania zespołu nie musi być trudny i żmudny, korzystając z naszego doświadczenia osiągniesz efekty szybciej a swoją energię wykorzystasz do osiągnięcia celów biznesowych. ' +
        'Otwieramy dla Twojego zespołu bezpieczny poligon możliwości – pierwszy krok należy do Ciebie…');
      await homePage.checkTuckmanTitle('Cykl życia zespołu według Tuckmana');
    });
  });

  test.describe('Offer Puzzles', () => {
    test('Integration Trips', async ({page}) => {
      await checkOfferPuzzle(page, 'Wyjazdy integracyjne', 'Wyjazdy integracyjne', 'Wspólny wyjazd czy impreza integracyjna może być pierwszym krokiem w „formowaniu” zespołu. To czas na poznanie siebie i swoich możliwości. W naszej ofercie znajdziecie krótkie programy indoorowe jak i rozbudowane scenariusze na lądzie, wodzie i w powietrzu. Wśród nich m.in. autorskie gry miejskie oraz gry terenowe.', '/wyjazdy-integracyjne/');
    });

    test('Trainings', async ({page}) => {
      await checkOfferPuzzle(page, 'Szkolenia', 'Szkolenia', 'Budowanie zespołu to ciągły proces. Pierwsze tarcia i konflikty potrafią negatywnie wpłynąć nie tylko na atmosferę ale i efektywność całego zespołu. Zaufanie, komunikacja i współpraca wymagają czasu i przemyślanych rozwiązań. W tym procesie nie można iść na skróty a czas poświęcony na trening, zwraca się po stokroć, dając impuls rozwojowy na płaszczyznach życia osobistego i biznesowego.', '/szkolenia/');
    });

    test('Team Building', async ({page}) => {
      await checkOfferPuzzle(page, 'Team building', 'Team building', 'Serdecznie zapraszamy do wspólnej podróży w poszukiwaniu cennych i rozwijających doświadczeń. Czy dobry zespół oparty jest na „Efektywnej komunikacji”? W końcu wszyscy mówimy tym samym językiem a tak często zupełnie się nie rozumiemy. Czy stwierdzenie „Jaki lider, taki zespół „ma sens? Odpowiedzi znajdziesz w naszych  popularnych szkoleniach jak „Przywództwo i zarządzanie zespołem” lub „Komunikacja interpersonalna”', '/team-building/');
    });

    test('Events', async ({page}) => {
      await checkOfferPuzzle(page, 'Eventy', 'Eventy', 'Na każdym etapie życia zespołu jest miejsce na Event, wieczorną zabawę, czy konferencję tematyczną służącą podsumowaniu lub inauguracji. W naszej ofercie znajdziecie Państwo propozycje od kameralnych programów artystycznych, wieczorów tematycznych po kompleksową obsługę techniczną i artystyczną.', '/eventy/');
    });

    const checkOfferPuzzle = async (page: Page, offerPuzzle: OfferPuzzle, title: string, description: string, path: string) => {
      await homePage.checkOfferPuzzleTitle(offerPuzzle, title);
      await homePage.checkOfferPuzzleDescription(offerPuzzle, description);
      await homePage.clickOfferPuzzle(offerPuzzle);
      await page.waitForURL(path, {timeout: 10000});
    };
  });

  test.describe('References', () => {
    test('Validate references data', async () => {
      const buffer = fs.readFileSync(path.join(__dirname, 'references.json'));
      const references = JSON.parse(buffer.toString());
      for (let i = 0; i < references.length; i += 1) {
        await homePage.checkReferenceTitle(i, references[i].title);
        await homePage.checkReferenceDescription(i, references[i].description);
        await homePage.checkReferenceCompanyName(i, references[i].companyName);
        await homePage.checkReferenceDate(i, references[i].date);
      }
      await homePage.checkNumberOfReferences(13);
    });
  });

  test.describe('Realisations', () => {
    test('Validate realisations with tags', async () => {
      await homePage.checkNumberOfRealizedTiles(8);
      await homePage.checkTagsExistence(['TEAM BUILDING', 'EVENTY', 'COACHING', 'IMPREZY FIRMOWE']);
    });
  });
});
