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

export type PartialImageAnalysis = z.infer<
  typeof imageAnalysisSchema
>["analysis"];

export type ImageAnalysis = {
  furniture: string;
  keyFeatures: string[];
  description: string;
  hashtags: string[];
  callToAction: string;
  visualDesign: string;
  imageUrl?: string | null;
  price?: string | null;
  colorScheme?: {
    primary: string;
    secondary?: string;
    accent?: string;
  };
};
