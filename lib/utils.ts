import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  generalAnalysisSchema,
  instagramAnalysisSchema,
  twitterAnalysisSchema,
  linkedinAnalysisSchema,
} from "./schemas";
import { z } from "zod";

export function getSchemaByPlatform(
  platform: "general" | "instagram" | "twitter" | "linkedin",
) {
  let schema;
  switch (platform) {
    case "instagram":
      schema = instagramAnalysisSchema;
      break;
    case "twitter":
      schema = twitterAnalysisSchema;
      break;
    case "linkedin":
      schema = linkedinAnalysisSchema;
      break;
    default:
      schema = generalAnalysisSchema;
  }
  return z.object({ analysis: schema });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
