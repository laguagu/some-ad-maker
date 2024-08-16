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
    })
    .strict(),
});

export type PartialImageAnalysis = z.infer<
  typeof imageAnalysisSchema
>["analysis"];

export type ImageAnalysis = {
  [K in keyof PartialImageAnalysis]-?: K extends "imageUrl" | "price"
    ? PartialImageAnalysis[K] | null // Salli null- ja undefined-arvot
    : Exclude<PartialImageAnalysis[K], undefined | null>; // Poista undefined ja null muista kentistä
};
