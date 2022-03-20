# mobile-app-project-ionic

[Link](http://fireshop.stensgaard-medie.dk/)

App for mobile dev. class made in Ionic

Jonathan StoneFarm og Mads Hoe

## Short description of our app, concept and idea

Vores app er en bygget som en salgsapp, hvor brugerne kan sælge deres brugte produkter.
Appen er bygget op, så brugerne kan kontakte hinanden udenfor appen, så alt kontakt foregår igennem kunderne selv.

Ideen var, at man skulle kunne bruge salgsappen med få tryk, og dermed gøre brugeroplevelsen meget nem.
Derfor er conceptet kun bygget med 3 "hovedtabs" og dertil nogle tilhørende routes.

## Design choices

For at gøre vores app hurtig og nem at benytte for brugeren har vi benyttet os af flere heuristics indenfor design og ux:
Fra NN Group:

- Visibility of system status: På forsiden og profil siden benytter vi os af loading elementer, til at vise overfor brugeren at produkterne hentes frem.
- Consistency and standards: Mange af Ionics components er lavet til at matche designet af native elementer på brugernes enheder, hvilket gør designet mere genkendeligt for brugeren.
- Error prevention: For at brugeren ikke prøver at sælge et produkt uden de nødvendige informationer, validere appen input felterne og giver besked om der mangler information.
- Aesthetic and minimalist design: Vores app gør brug af et simpelt design for at holde fokus på at købe og sælge produkterne.

## Project structure

Vi har under udviklingen af vores app, opdelt vores funktionaliteter i comopnents, som hjælper os med at holde styr på siden.
Hver componemt og side har dertil også deres egxsen styling fil, så vi altså nemt har kunne tilpasse det eksakte element.

At have en opdelt app, har hjulpet os med at kunne debugge bedre, da vi altid har haft et overblik over hvor fejl er opstået.

Som REST API har vi benyttet api.positionstack.com/ for at kunne få navnet på byen, ud fra de koordinater vi får fra device Geolocation.

Vi har under projektet gjort brug af Firebase som database. I Firebase har vi benyttet os af Auth, RTD (Realtime Database) og Storage.

- Vi har brugt Auth, så det er muligt for brugerne at lave kontoer og logge ind i vores app
- Vi har brugt RTD til at holde styr på produkter og brugere i vores app
- Til sidst har vi brugt storage, til at gemme billeder der uploades til appen, her både profilbilleder, men også produkt billeder.

### Native APIs

Vi har brugt følgende native APIs:

- Kamera: Så brugeren kan tage billeder af deres produkt.
- Geolocation: For at gemme produktets lokation og for at kunne give produkter i nærheden af brugeren, baseret på by.
- Toast: Til at give brugeren informationer, som ved manglende produkt info.

## Running our app

From dev to running app:

- For Android development:
  - ionic cap android
  - ionic cap copy android
  - ionic cap open android
- For Android app build

  - ionic capacitor build android

- For web app build:
  - Ionic build --prod
