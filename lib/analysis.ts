import { ImageAnalysis } from "@/app/api/image-analysis/schema";
import { v4 as uuidv4 } from "uuid";
const analyses: Record<string, ImageAnalysis & { imageUrl: string }> = {};

export async function saveAnalysis(
  data: ImageAnalysis & { imageUrl: string },
): Promise<string> {
  const id = uuidv4();
  analyses[id] = data;
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key]) => key !== "imageUrl"),
  );

  console.log(`Analyysi tallennettu ID:llä ${id}:`, filteredData);
  return id;
}

export async function getAnalysisById(
  id: string,
): Promise<(ImageAnalysis & { imageUrl: string }) | null> {
  console.log(`Haetaan analyysi ID:llä ${id}`);
  const analysis = analyses[id];
  if (analysis) {
    console.log(`Analyysi löytyi:`);
  } else {
    console.log(`Analyysiä ei löytynyt ID:llä ${id}`);
  }
  return analysis || null;
}
