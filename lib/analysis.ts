import { ImageAnalysis } from "@/app/api/image-analysis/schema";

const analyses: Record<string, ImageAnalysis & { imageUrl: string }> = {};

export async function saveAnalysis(
  data: ImageAnalysis & { imageUrl: string },
): Promise<string> {
  const id = Math.random().toString(36).slice(2, 11); // Käytetään slice substr:n sijaan
  analyses[id] = data;
  console.log(`Analyysi tallennettu ID:llä ${id}:`, data);
  return id;
}

export async function getAnalysisById(
  id: string,
): Promise<(ImageAnalysis & { imageUrl: string }) | null> {
  console.log(`Haetaan analyysi ID:llä ${id}`);
  const analysis = analyses[id];
  if (analysis) {
    console.log(`Analyysi löytyi:`, analysis);
  } else {
    console.log(`Analyysiä ei löytynyt ID:llä ${id}`);
  }
  return analysis || null;
}
