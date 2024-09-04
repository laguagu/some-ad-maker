import { z } from "zod";

// export const imageAnalysisSchema = z.object({
//   analysis: z
//     .object({
//       furniture: z.string().describe("Huonekalun nimi suomeksi"),
//       keyFeatures: z
//         .array(z.string())
//         .describe("Huonekalun tärkeimmät ominaisuudet suomeksi"),
//       description: z
//         .string()
//         .describe("Houkutteleva kuvaus somemyyntipostausta varten suomeksi"),
//       imageUrl: z
//         .string()
//         .nullable()
//         .optional()
//         .describe("Huonekalun kuvan URL"),
//       hashtags: z.array(z.string()).describe("Sopivat hashtagit suomeksi"),
//       price: z
//         .string()
//         .nullable()
//         .optional()
//         .describe("Huonekalun hinta euroina"),
//       callToAction: z.string().describe("Toimintakehotus suomeksi"),
//       colorScheme: z
//         .object({
//           primary: z.string().describe("Pääväri englanniksi"),
//           secondary: z
//             .string()
//             .optional()
//             .describe("Toissijainen väri englanniksi"),
//           accent: z.string().optional().describe("Korostusväri englanniksi"),
//         })
//         .optional()
//         .describe(
//           "Huonekalun ja kuvan värimaailma, joka on yhteensopiva background-color CSS ominaisuuden kanssa",
//         ),
//       visualDesign: z
//         .string()
//         .describe("Ehdotus myynti-ilmoituksen visuaalisesta ilmeestä"),
//     })
//     .strict()
//     .describe("Myynti-ilmoitus somemyyntipostausta varten"),
// });

const baseAnalysisSchema = z.object({
  furniture: z.string().describe("Huonekalun nimi suomeksi"),
  keyFeatures: z
    .array(z.string())
    .describe("Huonekalun tärkeimmät ominaisuudet suomeksi"),
  description: z
    .string()
    .describe("Houkutteleva kuvaus somemyyntipostausta varten suomeksi"),
  imageUrl: z.string().nullable().optional().describe("Huonekalun kuvan URL"),
  price: z.string().nullable().optional().describe("Huonekalun hinta euroina"),
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
    .describe("Huonekalun ja kuvan värimaailma"),
  visualDesign: z
    .string()
    .describe("Ehdotus myynti-ilmoituksen visuaalisesta ilmeestä"),
});

export const instagramAnalysisSchema = baseAnalysisSchema.extend({
  hashtags: z.array(z.string()).describe("Instagram-sopivat hashtagit"),
  carouselImages: z
    .array(z.string())
    .optional()
    .describe("URLs lisäkuville karusellipostausta varten"),
  storyIdea: z.string().optional().describe("Idea Instagram Storyyn"),
});

export const twitterAnalysisSchema = baseAnalysisSchema.extend({
  shortDescription: z
    .string()
    .max(280)
    .describe("Lyhyt kuvaus Twitteriä varten, max 280 merkkiä"),
  relevantTrends: z
    .array(z.string())
    .optional()
    .describe("Aiheeseen liittyvät trendit Twitterissä"),
});

export const linkedinAnalysisSchema = baseAnalysisSchema.extend({
  professionalDescription: z
    .string()
    .describe("Ammattimainen kuvaus LinkedIniä varten"),
  industryTags: z.array(z.string()).describe("Toimialaan liittyvät avainsanat"),
});

export const generalAnalysisSchema = baseAnalysisSchema.extend({
  hashtags: z.array(z.string()).describe("Sopivat hashtagit"),
});
