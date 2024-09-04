## Kehittäjille

### useObject Hook

`useObject` on kokeellinen [Vercel AI SDK:n](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-object) tarjoama hook React-sovelluksissa. Se mahdollistaa JSON-objekteja edustavien tekstivirtojen kulutuksen ja jäsentämisen kokonaisiksi objekteiksi määritellyn skeeman perusteella. Tätä hookia käytetään yhdessä backend-puolen `streamObject` funktion kanssa.

#### Käyttö:

```javascript
const { object, submit, isLoading, error, stop } = useObject({
  api: '/api/image-analysis',
  schema: imageAnalysisSchema,
  id: analysisId,
  onFinish: () => {
    // Käsittele analyysin valmistuminen
  },
  onError: (error) => {
    // Käsittele virhetilanteet
  }
});
```

#### Tärkeimmät ominaisuudet:

- `api`: API-endpoint, joka streamaa JSON-dataa chunkeina.
- `schema`: Zod-skeema tai JSON-skeema, joka määrittelee objektin rakenteen.
- `id`: Uniikki tunniste, joka mahdollistaa tilan jakamisen komponenttien välillä.
- `submit`: Funktio API-kutsun tekemiseen.
- `object`: Generoitu objekti, joka päivittyy sitä mukaa kun API streamaa JSON-chunkkeja.
- `isLoading`: Boolean-lippu, joka ilmaisee onko pyyntö käynnissä.
- `stop`: Funktio nykyisen API-pyynnön keskeyttämiseen.

Tämä hook on erityisen hyödyllinen käsiteltäessä suuria datamääriä tai pitkäkestoisia operaatioita, sillä se mahdollistaa datan progressiivisen renderöinnin käyttöliittymässä.

Lisätietoja `useObject` hookista ja sen käytöstä löydät [Vercel AI SDK:n dokumentaatiosta](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-object).
