import { streamObject } from "ai";
import { imageAnalysisSchema } from "@/lib/schemas";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

// Aseta tämä true:ksi käyttääksesi mockattua dataa
const USE_MOCK_DATA = true;

// Mockattu data-objekti
export const mockAnalysis = {
  analysis: {
    furniture: "Moderni jakkara",
    keyFeatures: [
      "Kestävä metallirunko",
      "Ergonominen muotoilu",
      "Helposti puhdistettava pinta",
      "Pinottava rakenne",
    ],
    description:
      "Tämä tyylikäs ja monikäyttöinen jakkara tuo ripauksen modernia designia kotiisi tai toimistoosi. Sen kestävä metallirunko ja ergonominen muotoilu takaavat pitkäaikaisen käyttömukavuuden. Helposti puhdistettava pinta tekee jakkarasta käytännöllisen valinnan kiireiseen arkeen. Pinottava rakenne säästää tilaa, kun jakkaraa ei käytetä.",
    imageUrl: "https://example.com/moderni-jakkara.jpg",
    hashtags: [
      "#ModerniJakkara",
      "#SisustusInspiraatio",
      "#KotiSisustus",
      "#ToimistoKaluste",
      "#DesignHuonekalu",
      "#ModernDesign",
    ],
    price: "89,99 €",
    callToAction: "Tilaa nyt ja tuo ripaus modernia tyylikkyyttä tiloihisi!",
    colorScheme: {
      primary: "black",
      secondary: "grey",
      accent: "beige",
    },
    visualDesign:
      "Suunnittele myynti-ilmoitus, joka korostaa jakkaran modernia muotoilua. Käytä valkoista taustaa, jotta musta jakkara erottuu selkeästi. Lisää kromiyksityiskohtia korostamaan tuotteen laadukasta viimeistelyä. Käytä selkeää, sans-serif-fonttia tekstissä ja järjestä tuotteen ominaisuudet helposti luettavaan muotoon, esimerkiksi ikonien kanssa. Sisällytä lähikuva jakkaran pinnasta osoittamaan sen helppohoitoisuutta. Lisää visualisointiin myös kuva pinottavista jakkara, joka demonstroi niiden tilaa säästävää ominaisuutta.",
  },
};

export async function POST(req: Request) {
  const { image, options } = await req.json();
  console.log("options", options);
  const promptTemplate = `Analysoi tämä kuva suomalaisen huonekaluliikkeen somemyyntipostausta varten. 
    Tunnista huonekalu, sen tärkeimmät ominaisuudet, ehdota houkuttelevaa kuvausta, 
    sopivia hashtageja suomeksi ja englanniksi, hinta-arviota ja toimintakehotusta. 

    ${
      options.includeColorScheme
        ? "Analysoi myös kuvan ja huonekalun värimaailma, määritellen päävärin, mahdollisen toissijaisen värin ja korostusvärin. Käytä näitä värejä myynti-ilmoituksen suunnittelussa."
        : ""
    }

    Huomioi analyysissäsi seuraava tyylisuunta: ${options.styleTheme}. 
    Mukauta kuvausta, ominaisuuksia ja toimintakehotusta tähän tyylisuuntaan sopivaksi.

    ${
      options.styleTheme === "modern"
        ? "Korosta moderneja, innovatiivisia ominaisuuksia ja minimalistista muotoilua."
        : options.styleTheme === "classic"
          ? "Painota ajatonta eleganssia, laadukkaita materiaaleja ja perinteistä käsityötaitoa."
          : "Keskity skandinaavisen muotoilun yksinkertaisuuteen, toiminnallisuuteen ja luonnonläheisyyteen."
    }

    Luo myynti-ilmoitus, joka heijastaa valittua tyylisuuntaa ja värimaailmaa (jos valittu). 
    Sisällytä ehdotus, miten myynti-ilmoituksen visuaalinen ilme voisi tukea valittua tyylisuuntaa ja värimaailmaa.

    Vastaa suomeksi.`;

  if (USE_MOCK_DATA) {
    // Simuloi viivettä
    // await new Promise((resolve) => setTimeout(resolve, 1500));

    // Palauta mockattu data streamObject-muodossa
    return new Response(JSON.stringify(mockAnalysis), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    const result = await streamObject({
      model: openai("gpt-4o-2024-08-06"),
      schema: imageAnalysisSchema,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: promptTemplate },
            { type: "image", image: image },
          ],
        },
      ],
    });

    return result.toTextStreamResponse();
  }
}
