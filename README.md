# DataManagementDashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.10.

## Instalace

npm install

## Build aplikace

ng build

## Spuštění aplikace

ng serve

Aplikace bude spuštěna na http://localhost:4200/

## Spuštění testů

ng test

### Struktura aplikace

Components - product -> komponenty specifické pro Product:
    DeleteDialog - dialog pro potvrzení mazání produktu
    ProductBasic - komponenta, kterou rozšiřují další Product komponenty a obsahuje metody /    servicy, které by jinak bylo třeba několikrát injectovat v jednotlivých komponentách
    ProductDetail - detail produktu
    ProductEdit - pro úpravu / vytvoření nového produktu (rozhoduje se dle přítomnosti product id v path)
    ProductList - úvodní stránka aplikace s tabulkou produktů a filtry

Components - ui -> komponenty použitelné napříč aplikací:
    Footer - footer aplikace
    Header - header aplikace
    Snackbar - šablona pro snackbar (notifikace) v aplikaci

Models -> ProductModel - interface k části Product

Services -> servisy k Product:
    ProductApiServiceSpec - unit testy
    ProductApiService - volání endpointů přes httpClient
    ProductService - volání endpointů přes ProductApiService a práce se signalStore

Shared -> MaterialImport - soubor knihoven angular material pro import do komponent

Store -> ProductStore - implementace signalStore

### Vysvětlení technických rozhodnutí

UI -> kombinace angular material (předpřipravené komponenty, jednoduché a efektivní UI) + tailwind (vzhledem k velikosti aplikace netřeba psát specifické classy, nejsou potřeba zvlášť .css soubory, snadné použití)

Angular v 20.3.0. - tady přiznávám chybku, které jsem si všiml až na konci - nepohlídal jsem si, že je to nejnovější a velmi čerstvá verze (překlik při instalaci) a tudíž může mít potenciální neodhalené problémy. Lepší by bylo použít lehce starší, ale odladěnou verzi.

SignalStore - jsem zvyklí na používání klasického store, se signalStore tolik zkušeností nemám, ale v rámci aktuality technologií a výhod oproti "starému" store jsem jej chtěl využít i tak. Výhodu store spatřuji v ušetření volání API pro již dostupná data a předávání napříč komponentami (list - detail).

API - na https://api.mockfly.dev jsem si vytvořil mock 50 produktů pro provolání API. Další endpointy (create, update, delete, getProductById) nejsou funkční (byť jsou připravené a na skutečných EP by měly fungovat). Potřeboval bych si vytvořit funkční databázi k reálným funkcionalitám, což jsem vzhledem ke snaze dodržet cca 8h nestihl.

UnitTesty - záležitost, se kterou mám minimům zkušeností, nicméně vzhledem k požadavkům jsem se pokusil o implementaci.

### TODOs / návrhy na vylepšení
- sjednotit UI tlačítek do buttonComponenty, paddingy, vylepšit menu, ...
- napojení na databázi a ověření funkčnosti EP
- podpora accessibility, případná autorizace
- productDetail - v případě refreshe stránky zachovat data / zavolat službu, která načte produkt dle id z url
- error handling, loading pro api
- configurace eslint pravidel

### Čas strávený vývojem

