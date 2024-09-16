import { AnalysisOptions } from "@/lib/types";
import { getSchemaByPlatform } from "@/lib/utils";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import sharp from "sharp";

export const maxDuration = 35;
// Aseta tämä true:ksi käyttääksesi mockattua dataa
const USE_MOCK_DATA = false;
const llmModel = openai("gpt-4o-2024-08-06");
const ALLOWED_FORMATS = ["png", "jpeg", "jpg", "gif", "webp"];

async function validateAndResizeImage(base64Image: string): Promise<Buffer> {
  // Erota tiedostotyyppi ja base64-data
  const format = base64Image.split("/")[1].split(";")[0].toLowerCase();
  console.log("format", format);

  if (!format || !ALLOWED_FORMATS.includes(format)) {
    throw new Error(
      `Kuvaformaatti ei ole tuettu. Sallitut formaatit ovat: ${ALLOWED_FORMATS.join(", ")}.`,
    );
  }

  // Erota base64-data
  const base64Data = base64Image.split(",")[1];
  const buffer = Buffer.from(base64Data, "base64");

  const resizedBuffer = await sharp(buffer)
    .resize(1024, 1024, { fit: "inside", withoutEnlargement: true })
    .toFormat("jpeg", { quality: 80 })
    .toBuffer();

  return resizedBuffer;
}

// Mockattu data-objekti
const mockAnalysis = {
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
  try {
    const { image, options } = (await req.json()) as {
      image: string;
      options: AnalysisOptions;
    };
    const schema = getSchemaByPlatform(options.platform);

    const validatedImage = await validateAndResizeImage(image);
    const promptTemplate = `Analysoi tämä kuva suomalaisen huonekaluliikkeen sosiaalisen median myynti-ilmoitusta varten. 
    Tunnista huonekalu, sen tärkeimmät ominaisuudet, ehdota houkuttelevaa kuvausta, 
    sopivia hashtageja, hinta-arviota ja toimintakehotusta. 

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
          : options.styleTheme === "scandinavian"
            ? "Keskity skandinaavisen muotoilun yksinkertaisuuteen, toiminnallisuuteen ja luonnonläheisyyteen."
            : ""
    } 

    Luo myynti-ilmoitus, joka heijastaa valittua tyylisuuntaa. 
    Sisällytä ehdotus, miten myynti-ilmoituksen visuaalinen ilme voisi tukea valittua tyylisuuntaa ja värimaailmaa.
    Sisällytä analyysiin myös värimaailma.
    Vastaa suomeksi.`;

    if (USE_MOCK_DATA) {
      return new Response(JSON.stringify(mockAnalysis), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
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

      return result.toTextStreamResponse();
    }
  } catch (error) {
    console.error("Virhe analyysissä on error:");
    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : "Tuntematon virhe kuvan analysoinnissa",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
