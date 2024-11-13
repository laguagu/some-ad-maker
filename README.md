# Ensimmäinen versio mainosmestari soveluksesta ( Ei opiskelijaryhmän tekemä )

## Projektin kuvaus

Tämä sovellus on tehokas työkalu myynti-ilmoitusten luomiseen tekoälyn avulla. Se mahdollistaa kuvien lataamisen, automaattisen myynti-ilmoituksen generoinnin ja sen jälkeen ilmoituksen visuaalisen muokkaamisen. Lopputuloksena on ammattimainen ja houkutteleva myynti-ilmoitus, jonka voi helposti jakaa sosiaalisessa mediassa tai tallentaa myöhempää käyttöä varten.

## Ominaisuudet

- Kuvien lataus ja esikatselu
- Tekoälypohjainen myynti-ilmoituksen generointi
- Drag-and-drop -muokkaustyökalu
- Värien ja fonttikoon muokkaus
- Kuvan tallennus ja jakaminen
- Taustan poisto -ominaisuus
- Eri tyylisuuntien valinta (moderni, klassinen, skandinaavinen)

## Projektin rakenne

- `/lib`: Sisältää apufunktioita ja keskeisiä määrittelyjä
  - `/store/store.ts`: Zustand-store sovelluksen tilan hallintaan
  - `schemas.ts`: Zod-skeemat datan validointiin
  - `types.ts`: TypeScript-tyyppimäärittelyt
  - `actions.ts`: Server Action -funktiot
- `/components`: React-komponentit
- `/app`: Next.js sivut ja API-reitit

## Asennus

1. Kloonaa repositorio:

   ```
   git clone https://github.com/laguagu/somepost-maker.git
   cd ai-ad-image-generator
   ```

2. Asenna riippuvuudet:

   ```
   npm install
   ```

3. Kopioi `.env.example` tiedosto nimellä `.env.local` ja lisää tarvittavat ympäristömuuttujat:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. Käynnistä kehityspalvelin:

   ```
   npm run dev
   ```

## Käyttöohjeet

1. **Kuvan lataus**

   - Avaa sovellus selaimessasi (oletuksena `http://localhost:3000`)
   - Käytä "Lataa kuva" -toimintoa ladataksesi kuvan laitteeltasi

2. **Analyysiasetusten valinta**

   - Valitse haluamasi tyylisuunta (moderni, klassinen, skandinaavinen)
   - Halutessasi valitse "Poista tausta" -vaihtoehto

3. **Myynti-ilmoituksen generointi**

   - Klikkaa "Analysoi kuva" -painiketta
   - Tekoäly analysoi kuvan ja luo alustavan myynti-ilmoituksen

4. **Ilmoituksen muokkaus**

   - Käytä drag-and-drop -toimintoa elementtien uudelleenjärjestämiseen
   - Muokkaa tekstejä, värejä ja asettelua tarpeen mukaan

5. **Kuvan tallennus ja jakaminen**
   - Tallenna valmis ilmoitus klikkaamalla "Tallenna myynti-ilmoitus"
   - Jaa tallennettu kuva haluamallasi tavalla

## Kehittäjille

### Zustand Store

Sovelluksen tila hallitaan Zustand-storen avulla. Store löytyy tiedostosta `lib/store/store.ts`. Se sisältää mm. seuraavat tilat ja toiminnot:

- `file`: Ladattu kuvatiedosto
- `previewUrl`: Esikatseltavan kuvan URL
- `analysisOptions`: Analyysin asetukset (tyylisuunta, taustan poisto jne.)
- `setFile`, `setPreviewUrl`, `setAnalysisOptions`: Funktiot tilojen päivittämiseen

### Tyypit ja skeemat

- `lib/types.ts` sisältää keskeiset TypeScript-tyyppimäärittelyt
- `lib/schemas.ts` sisältää Zod-skeemat datan validointiin

### Server Actions

Server Action -funktiot löytyvät tiedostosta `lib/actions.ts`. Ne hoitavat mm. taustan poiston ja analyysin tallennuksen.

## Kehitysideat

- Useamman kuvan tuki yhdessä ilmoituksessa
- Lisää muokkaustyökaluja (esim. tekstin korostus, emojit)
- Käyttäjäprofiilien ja tallennettujen mallien tuki
- Integraatio eri sosiaalisen median alustoille
- Erilaisten skeemojen ja objektien generointi tilamuuttujan avulla:
  - Implementoi järjestelmä, joka mahdollistaa erilaisten skeemojen (esim. `imageAnalysisSchema`) valinnan tilamuuttujan perusteella.
  - Luo eri sosiaalisen median alustoille optimoituja skeemoja (esim. Instagram, Twitter, LinkedIn).
  - Mahdollista yksinkertaistettujen tai laajennettujen analyysien generointi käyttäjän tarpeiden mukaan.

## Kehittäjille

### useObject Hook

`useObject` on kokeellinen [Vercel AI SDK:n](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-object) tarjoama hook React-sovelluksissa. Se mahdollistaa JSON-objekteja edustavien tekstivirtojen kulutuksen ja jäsentämisen kokonaisiksi objekteiksi määritellyn skeeman perusteella. Tätä hookia käytetään yhdessä backend-puolen `streamObject` funktion kanssa.

#### Käyttö

```javascript
const { object, submit, isLoading, error, stop } = useObject({
  api: "/api/image-analysis",
  schema: imageAnalysisSchema,
  id: analysisId,
  onFinish: () => {
    // Käsittele analyysin valmistuminen
  },
  onError: (error) => {
    // Käsittele virhetilanteet
  },
});
```

#### Tärkeimmät ominaisuudet

- `api`: API-endpoint, joka streamaa JSON-dataa chunkeina.
- `schema`: Zod-skeema tai JSON-skeema, joka määrittelee objektin rakenteen.
- `id`: Uniikki tunniste, joka mahdollistaa tilan jakamisen komponenttien välillä.
- `submit`: Funktio API-kutsun tekemiseen.
- `object`: Generoitu objekti, joka päivittyy sitä mukaa kun API streamaa JSON-chunkkeja.
- `isLoading`: Boolean-lippu, joka ilmaisee onko pyyntö käynnissä.
- `stop`: Funktio nykyisen API-pyynnön keskeyttämiseen.

Tämä hook on erityisen hyödyllinen käsiteltäessä suuria datamääriä tai pitkäkestoisia operaatioita, sillä se mahdollistaa datan progressiivisen renderöinnin käyttöliittymässä.

Lisätietoja `useObject` hookista ja sen käytöstä löydät [Vercel AI SDK:n dokumentaatiosta](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-object).

## Lisenssi

Tämä projekti on lisensoitu MIT-lisenssin alla. Katso [LICENSE](LICENSE) tiedosto lisätietoja varten.
