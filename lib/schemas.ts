import { z } from "zod";

export const imageAnalysisSchema = z.object({
  analysis: z
    .object({
      furniture: z.string().describe("Huonekalun nimi suomeksi"),
      keyFeatures: z
        .array(z.string())
        .describe("Huonekalun tärkeimmät ominaisuudet suomeksi"),
      description: z
        .string()
        .describe("Houkutteleva kuvaus somemyyntipostausta varten suomeksi"),
      imageUrl: z
        .string()
        .nullable()
        .optional()
        .describe("Huonekalun kuvan URL"),
      hashtags: z.array(z.string()).describe("Sopivat hashtagit suomeksi"),
      price: z
        .string()
        .nullable()
        .optional()
        .describe("Huonekalun hinta euroina"),
      callToAction: z.string().describe("Toimintakehotus suomeksi"),
      colorScheme: z
        .object({
          primary: z.string().describe("Pääväri englanniksi"),
          secondary: z
            .string()
            .optional()
            .describe("Toissijainen väri englanniksi"),
          accent: z.string().optional().describe("Korostusväri englanniksi"),
        })
        .optional()
        .describe(
          "Huonekalun ja kuvan värimaailma, joka on yhteensopiva background-color CSS ominaisuuden kanssa",
        ),
      visualDesign: z
        .string()
        .describe("Ehdotus myynti-ilmoituksen visuaalisesta ilmeestä"),
    })
    .strict()
    .describe("Myynti-ilmoitus somemyyntipostausta varten"),
});
