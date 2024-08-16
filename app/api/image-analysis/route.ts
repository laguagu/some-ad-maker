import { streamObject } from "ai";
import { imageAnalysisSchema } from "./schema";
import { openai } from "@ai-sdk/openai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { image } = await req.json();
  const result = await streamObject({
    model: openai("gpt-4o"),
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
