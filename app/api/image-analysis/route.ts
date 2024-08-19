import { streamObject } from "ai";
import { imageAnalysisSchema } from "./schema";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

// Aseta tämä true:ksi käyttääksesi mockattua dataa
const USE_MOCK_DATA = true;

// Mockattu data-objekti
const mockAnalysis = {
  analysis: {
    furniture: 'Jakkara',
    keyFeatures: ['Kestävä', 'Tyylikäs', 'Monikäyttöinen', 'Helppo puhdistaa'],
    description: 'Tämä tyylikäs ja kestävä jakkara tuo ripauksen pohjoismaista muotoilua kotiisi. Jakkara on monikäyttöinen lisä mihin tahansa tilaan.',
    imageUrl: 'https://www.avotakka.fi/wp-content/uploads/2021/06/avotakka-2021-06-07-60be1b1e1b7c5.jpg',
    hashtags: ['#design', '#jakkara', '#sisustus', '#kestävä', '#tyylikäs', '#monikäyttöinen', '#helppopuhdistaa'],
    price: '129 €',
    callToAction: 'Osta nyt ja tuo tyylikkyyttä kotiisi!',
  }
};

export async function POST(req: Request) {
  const { image } = await req.json();

  if (USE_MOCK_DATA) {
    // Simuloi viivettä
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Palauta mockattu data streamObject-muodossa
    return new Response(JSON.stringify(mockAnalysis), {
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    const result = await streamObject({
      model: openai("gpt-4o-2024-08-06"),
      schema: imageAnalysisSchema,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analysoi tämä kuva suomalaisen huonekaluliikkeen somemyyntipostausta varten. Tunnista huonekalu, sen tärkeimmät ominaisuudet, ehdota houkuttelevaa kuvausta, sopivia hashtageja suomeksi ja englanniksi, hinta-arviota ja toimintakehotusta. Vastaa suomeksi.",
            },
            {
              type: "image",
              image: image,
            },
          ],
        },
      ],
    });

    return result.toTextStreamResponse();
  }
}