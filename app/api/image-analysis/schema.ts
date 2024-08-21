import { z } from "zod";

export const imageAnalysisSchemaSimple = z.object({
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
      hashtags: z
        .array(z.string())
        .describe("Sopivat hashtagit suomeksi ja englanniksi"),
      price: z
        .string()
        .nullable()
        .optional()
        .describe("Huonekalun hinta euroina"),
      callToAction: z.string().describe("Toimintakehotus suomeksi"),
    })
    .strict(),
});

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
      hashtags: z
        .array(z.string())
        .describe("Sopivat hashtagit suomeksi ja englanniksi"),
      price: z
        .string()
        .nullable()
        .optional()
        .describe("Huonekalun hinta euroina"),
      callToAction: z.string().describe("Toimintakehotus suomeksi"),
      colorScheme: z
        .object({
          primary: z.string().describe("Pääväri"),
          secondary: z.string().optional().describe("Toissijainen väri"),
          accent: z.string().optional().describe("Korostusväri"),
        })
        .optional()
        .describe("Huonekalun ja kuvan värimaailma"),
      visualDesign: z
        .string()
        .describe("Ehdotus myynti-ilmoituksen visuaalisesta ilmeestä"),
    })
    .strict(),
});

// Johdetaan tyyppi skeemasta
export type PartialImageAnalysis = z.infer<
  typeof imageAnalysisSchema
>["analysis"];

// Määritellään uusi tyyppi, joka poistaa undefined ja null muista kentistä paitsi imageUrl ja price
export type ImageAnalysis = Required<
  Omit<PartialImageAnalysis, "imageUrl" | "price" | "colorScheme">
> & {
  imageUrl?: string | null;
  price?: string | null;
  colorScheme?: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
};
