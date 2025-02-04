import { z } from "zod";

const baseAnalysisSchema = z.object({
  furniture: z.string().describe("Huonekalun nimi suomeksi"),
  keyFeatures: z
    .array(z.string())
    .describe("Huonekalun tärkeimmät ominaisuudet suomeksi"),
  description: z
    .string()
    .describe("Houkutteleva kuvaus somemyyntipostausta varten suomeksi"),
  imageUrl: z.string().nullable().optional().describe("Huonekalun kuvan URL"),
  price: z
    .string()
    .nullable()
    .describe("Huonekalun hinta euroina päättyen väliin ja €-merkkiin"),
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
});

export const instagramAnalysisSchema = baseAnalysisSchema.extend({
  hashtags: z.array(z.string()).describe("Instagram-sopivat hashtagit"),
  storyIdea: z.string().optional().describe("Idea Instagram Storyyn"),
});

export const twitterAnalysisSchema = baseAnalysisSchema.extend({
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
