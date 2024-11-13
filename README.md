# AI-Powered Ad Image Generator (mainosmestari beta version)

## Projektin kuvaus

Tämä sovellus on tekoälypohjainen työkalu myynti-ilmoitusten luomiseen. Se hyödyntää OpenAI:n GPT-4 mallia kuvien analysointiin ja myynti-ilmoitusten automaattiseen generointiin. Sovellus mahdollistaa kuvien lataamisen, taustan poiston, myynti-ilmoitusten luomisen ja visuaalisen muokkaamisen drag-and-drop -toiminnallisuudella.

## Ominaisuudet

- Kuvien lataus ja esikatselu
- Tekoälypohjainen kuva-analyysi ja myynti-ilmoitusten generointi
- Taustan poisto -ominaisuus
- Drag-and-drop muokkaustyökalu
- Värien ja fonttikoon muokkaus
- Eri tyylisuuntien valinta (moderni, klassinen, skandinaavinen)
- Sosiaalisen median alustakohtaiset optimoinnit

## Teknologiat

- Next.js 14
- TypeScript
- Tailwind CSS
- Zustand (tilanhallinnan)
- OpenAI API (GPT-4)
- DND Kit (drag-and-drop toiminnallisuus)
- Zod (skeemavalidointi)

### Skeemat ja Myynti-ilmoituksen Generointi

Sovellus käyttää Zod-skeemoja määrittämään myynti-ilmoitusten rakenteen. Perusskeeema (`baseAnalysisSchema`) määrittelee myynti-ilmoituksen perusrakenteen:

```typescript
const baseAnalysisSchema = {
  furniture: string,            // Huonekalun nimi
  keyFeatures: string[],       // Tärkeimmät ominaisuudet
  description: string,         // Kuvaus somemyyntipostausta varten
  imageUrl: string,           // Huonekalun kuvan URL
  price: string,              // Hinta-arvio
  callToAction: string,       // Toimintakehotus
  colorScheme: {              // Värimaailma
    primary: string,
    secondary?: string,
    accent?: string
  },
  visualDesign: string        // Visuaalisen ilmeen ehdotus
}
```

Tämän perusteella on luotu alustakohtaiset skeemat:

- `instagramAnalysisSchema` - Instagram-optimoitu rakenne
- `twitterAnalysisSchema` - Twitter-optimoitu rakenne
- `linkedinAnalysisSchema` - LinkedIn-optimoitu rakenne
- `generalAnalysisSchema` - Yleinen somerakenne

API (`/api/image-analysis`) käyttää näitä skeemoja yhdessä OpenAI:n kanssa generoidakseen myynti-ilmoituksen:

1. Kuva validoidaan ja optimoidaan
2. Valittu skeema määrittää generoitavan sisällön rakenteen
3. Streamattu vastaus muunnetaan JSON-muotoon käyttöliittymää varten

Esimerkki API-kutsusta:

```typescript
const result = await streamObject({
  model: llmModel,
  schema: schema,
  messages: [
    {
      role: "user",
      content: [
        { type: "text", text: promptTemplate },
        { type: "image", image: validatedImage },
      ],
    },
  ],
});
```

## Projektin rakenne

```
somepost-maker/
├── app/
│   ├── api/
│   │   ├── image-analysis/
│   │   └── remove-background/
│   └── page.tsx
├── components/
├── lib/
│   ├── store/
│   │   ├── screenshotStore.ts
│   │   ├── store.ts
│   │   └── useStyleStore.ts
│   ├── hooks/
│   ├── schemas.ts
│   ├── types.ts
│   └── utils.ts
└── public/
```

## Keskeisimmät komponentit

### API Routes

- `/api/image-analysis` - Käsittelee kuva-analyysin ja generoi myynti-ilmoituksen
- `/api/remove-background` - Taustan poisto -toiminnallisuus

### Stores (Zustand)

- `store.ts` - Päätilan hallinta (kuvatiedostot, analyysin asetukset)
- `screenshotStore.ts` - Kuvakaappausten hallinta
- `useStyleStore.ts` - Tyylien hallinta

## Asennus

1. Kloonaa repositorio:

```bash
git clone https://github.com/yourusername/somepost-maker.git
cd somepost-maker
```

3. Hanki OpenAI API avain:
   - Mene osoitteeseen https://platform.openai.com/
   - Kirjaudu sisään tai luo uusi tili
   - Siirry API-avaimen luontiin: https://platform.openai.com/api-keys
   - Luo uusi API-avain ja kopioi se talteen

4. Luo `.env.local` tiedosto ja lisää tarvittavat ympäristömuuttujat:

```bash
OPENAI_API_KEY=your_openai_api_key_here
```

5. Käynnistä kehityspalvelin:

```bash
npm run dev
```

## Julkaisu Rahti CSC -ympäristöön

Sovelluksen julkaisu Rahti CSC -ympäristöön tapahtuu seuraavasti:

1. Rakenna Docker-image:

```bash
docker build --no-cache -t mainosmestari .
```

2. Kirjaudu Rahti-ympäristöön OpenShift CLI:n avulla:

```bash
# Kirjaudu ensin Rahti-konsoliin ja hae kirjautumiskomento
oc login ...

# Kirjaudu konttirekisteriin
docker login -u $(oc whoami) -p $(oc whoami -t) image-registry.apps.2.rahti.csc.fi
```

3. Tagaa ja julkaise image:

```bash
# Tagaa image
docker tag mainosmestari image-registry.apps.2.rahti.csc.fi/alyakokeilut/mainosmestari:latest

# Pushaa image Rahdin rekisteriin
docker push image-registry.apps.2.rahti.csc.fi/alyakokeilut/mainosmestari:latest
```

4. Tarkista julkaisu Rahti-konsolista ja määritä tarvittavat ympäristömuuttujat (esim. OPENAI_API_KEY) Rahdin kautta.


## Lisenssi

MIT License - katso [LICENSE](LICENSE) tiedosto lisätietoja varten.
