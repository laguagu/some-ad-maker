# AI-Powered Ad Image Generator

## Projektin kuvaus

Tämä sovellus on tehokas työkalu myynti-ilmoitusten luomiseen tekoälyn avulla. Se mahdollistaa kuvien lataamisen, automaattisen myynti-ilmoituksen generoinnin ja sen jälkeen ilmoituksen visuaalisen muokkaamisen. Lopputuloksena on ammattimainen ja houkutteleva myynti-ilmoitus, jonka voi helposti jakaa sosiaalisessa mediassa tai tallentaa myöhempää käyttöä varten.

## Ominaisuudet

- Kuvien lataus
- Tekoälypohjainen myynti-ilmoituksen generointi
- Drag-and-drop -muokkaustyökalu
- Värien ja fonttikoon muokkaus
- Kuvan tallennus ja jakaminen

## Asennus

1. Asenna riippuvuudet:

   ```
   npm install
   ```

2. Nimeä `.env.example` -> `.env.local` projektin juuressa lisätäksesi seuraavat ympäristömuuttujat:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

3. Käynnistä kehityspalvelin:

   ```
   npm run dev
   ```

## Käyttöohjeet

1. **Kuvan lataus**

   - Avaa sovellus selaimessasi
   - Klikkaa "Lataa kuva" -painiketta ja valitse haluamasi kuva laitteeltasi

2. **Myynti-ilmoituksen generointi**

   - Kun kuva on ladattu, klikkaa "Generoi myyntikuva" -painiketta
   - Tekoäly analysoi kuvan ja luo alustavan myynti-ilmoituksen

3. **Ilmoituksen muokkaus**

   - Käytä drag-and-drop -toimintoa elementtien uudelleenjärjestämiseen
   - Valitse elementti klikkaamalla sitä
   - Muuta valitun elementin värejä ja fonttikokoa sivupalkissa olevilla työkaluilla

4. **Kuvan tallennus**

   - Kun olet tyytyväinen lopputulokseen, klikkaa "Lataa kuva" -painiketta
   - Kuva tallennetaan automaattisesti laitteellesi

5. **Jakaminen**
   - Voit jakaa tallennetun kuvan suoraan sosiaalisessa mediassa tai käyttää sitä muissa markkinointimateriaaleissa

## Kehitysideat

- Useamman kuvan tuki yhdessä ilmoituksessa
- Lisää muokkaustyökaluja (esim. tekstin korostus, emojit)
- Käyttäjäprofiilien ja tallennettujen mallien tuki

## Lisenssi

Tämä projekti on lisensoitu MIT-lisenssin alla. Katso [LICENSE](LICENSE) tiedosto lisätietoja varten.
