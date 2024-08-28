import { z } from "zod";
import { imageAnalysisSchema } from "./schemas";
// `ImageAnalysis` is a TypeScript type that is inferred from the `analysis` property
// of the `imageAnalysisSchema` using the `z.infer` utility from the Zod library.
// This means that `ImageAnalysis` will have the same shape as the `analysis` property
// defined in the `imageAnalysisSchema`.
export type ImageAnalysis = z.infer<typeof imageAnalysisSchema>["analysis"];
// `PartialImageAnalysis` is a TypeScript type that makes all properties of the
// `ImageAnalysis` type optional. This is achieved using the `Partial` utility type,
// which constructs a type with all properties of `ImageAnalysis` set to optional.
export type PartialImageAnalysis = Partial<ImageAnalysis>;
export type StreamedAnalysis = Partial<Record<keyof ImageAnalysis, any>>;
