Task Manager

Task Manager är en uppgiftshanterare byggd med React och JavaScript. Du kan använda den för att skapa, hantera och följa upp alla olika sorts uppgifter.

Uppgifterna sparas i localstorage så att det finns kvar efter en refresh.

FUNKTIONALITET

- skapa uppgifter med titel och beskrivning
- markera uppgifter som slutförda
- ta bort uppgifter
- visa alla uppgifter
- visa antal pågående och slutfärda uppgifter
- spara uppgifterna i localstorage
- logga händelser och fel
- monitorera antalet skapade uppgifter och fel
- simulera ett sparfel

TEKNIKER

- React
- JavaScript
- Vite
- Vitest
- Playwright

STARTA APPEN

gå in i projektmappen med cd task-manager

installera beroenden med npm install

starta appen med npm run dev och öppna addressen i webbläsaren.

ENHETSTESTER

Vitest anvnds för att testa appens logik och funktionalitet

du kan köra testerna med npx vitest run

funktionerna som testat är:
- att en uppgift kan skapas med korrekt information
- att en uppgift inte kan skapas utan titel
- att en uppgifts status kan ändras till slutförd
- att en uppgift kan tas bort
- att antalet slutförda uppgifter beräknas korrekt

E2E TESTER

Playwright används för att testa användarflöder i webbläsaren

du kan installera webbläsaren med npx playwright install chromium

du kan köra testerna med npx playwright test

om du vill se testerna köras i webbläsaren så använder du npx playwright test --headed

de som testas är:
- skapa en uppgift
- slutför en uppgift
- ta bort en uppgift

TESTRESULTAT

alla tester har körts och blivit godkända.
Det är totalt 8 styckna tester, 5 Vitest och 3 Playwright

LOGGNING

loggningen sker med console.log och console.error
det som loggas är
- när en uppgift skapas
- när en uppgift slutförs
- när en uppgift tas bort
- när ett fel uppstår

alla loggarna har tidsstämpel och information om händelsen

MONITORERING

Appen har en monitoreringspanel som visar
- antalet skapade uppgifter
- antalet registrerade fel

den informationen sparas i LocalStorage så att den finns kvar

SIMULERING AV INCIDENT OCH HANTERING

jag la till en funktion som simulrerar ett sparfel

du kan testa genom att
1. aktivera "simulera fel" i monitorpanelen
2. försöka skapa en ny uppgift
3. kontrollera felmeddelander i appen
4. kontrollera loggen i webbläsarens konsol
5. kontrollera att antalet registrerade fel ökar
6. stänga av simuleringen
7. skapa en ny uppgift

det som händer är när felet aktiveras gick det inte att skapa en ny uppgift, appen fångade upp felet och skrev ut ett felmeddelande i konsolen och den misslyckade uppgiften sparade inte.

den upptäcks genom felmeddelandet i appen och en error logg i konsolen, även i monitoreringspanelen kan du se antalet registrerade fel.

incidenten åtgärdades genom att stänga av "simulera fel" och då återställs appen. Efter återställningen kunde en ny uppgift skapas och sparas utan problem. Vid ett verkligt sparfel skulle man undersöka felloggarna och kontrollera om localstorage är fullt eller om webbläsaren blockar lagringen.

SLUTSATS

appen har utvecklats och kvalitetssäkrats med automatiska enhetstester, E2E tester, loggning och monitorering

alla åtta testerna har blivit godkända och incidenthanteringen har testats och appen kunde återställas till normalt läge.
