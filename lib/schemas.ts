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
    .strict(),
});
// `ImageAnalysis` is a TypeScript type that is inferred from the `analysis` property
// of the `imageAnalysisSchema` using the `z.infer` utility from the Zod library.
// This means that `ImageAnalysis` will have the same shape as the `analysis` property
// defined in the `imageAnalysisSchema`.
export type ImageAnalysis = z.infer<typeof imageAnalysisSchema>["analysis"];

// `PartialImageAnalysis` is a TypeScript type that makes all properties of the
// `ImageAnalysis` type optional. This is achieved using the `Partial` utility type,
// which constructs a type with all properties of `ImageAnalysis` set to optional.
export type PartialImageAnalysis = Partial<ImageAnalysis>;

export function ensureCompleteAnalysis(
  partial: PartialImageAnalysis,
): ImageAnalysis {
  return {
    furniture: partial.furniture ?? "",
    keyFeatures: partial.keyFeatures ?? [],
    description: partial.description ?? "",
    hashtags: partial.hashtags ?? [],
    callToAction: partial.callToAction ?? "",
    visualDesign: partial.visualDesign ?? "",
    imageUrl: partial.imageUrl ?? null,
    price: partial.price ?? null,
    colorScheme: partial.colorScheme,
  };
}
