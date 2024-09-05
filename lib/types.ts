import { z } from "zod";
import { generalAnalysisSchema } from "./schemas";
// `ImageAnalysis` is a TypeScript type that is inferred from the `analysis` property
// of the `imageAnalysisSchema` using the `z.infer` utility from the Zod library.
// This means that `ImageAnalysis` will have the same shape as the `analysis` property
// defined in the `imageAnalysisSchema`.
export type ImageAnalysis = z.infer<typeof generalAnalysisSchema>;
// `PartialImageAnalysis` is a TypeScript type that makes all properties of the
// `ImageAnalysis` type optional. This is achieved using the `Partial` utility type,
// which constructs a type with all properties of `ImageAnalysis` set to optional.
export type PartialImageAnalysis = Partial<ImageAnalysis>;
export type StreamedAnalysis = Partial<Record<keyof ImageAnalysis, any>>;
export type AnalysisOptions = {
  includeColorScheme: boolean;
  styleTheme: "modern" | "classic" | "scandinavian" | "";
  removeBackground: boolean;
  platform: "instagram" | "twitter" | "linkedin" | "general";
};
export type FlexibleImageAnalysis = Record<string, any>;
