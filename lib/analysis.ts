import { ImageAnalysis } from "@/app/api/image-analysis/schema";

const analyses: Record<string, ImageAnalysis & { imageUrl: string }> = {};

export async function saveAnalysis(
  data: ImageAnalysis & { imageUrl: string },
): Promise<string> {
  const id = Math.random().toString(36).slice(2, 11); // FIXME: Muuta UUID:n generointiin löytyy valmis npm paketti
  analyses[id] = data;
  const filteredData = Object.fromEntries(
    Object.entries(data).filter(([key]) => key !== "imageUrl")
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
    console.log(`Analyysi löytyi:`, analysis);
  } else {
    console.log(`Analyysiä ei löytynyt ID:llä ${id}`);
  }
  return analysis || null;
}


