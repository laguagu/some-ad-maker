"use server";
import { revalidatePath } from "next/cache";
import { saveAnalysis } from "./save-analysis";
import { FlexibleImageAnalysis } from "./types";

export async function removeBackGroundAction(
  formData: FormData,
  alpha_matting: boolean = false, // Pehmeämmän reunan saamiseksi jos True
): Promise<string> {
  formData.append("alpha_matting", alpha_matting.toString());

  const response = await fetch(
    "http://localhost:8000/remove-background-base64/",
    {
      method: "POST",
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error("Taustan poisto epäonnistui");
  }

  const { image } = await response.json();
  return `data:image/png;base64,${image}`;
}

export async function saveAnalysisAction(analysis: FlexibleImageAnalysis) {
  try {
    console.log("Tallennettava analyysi:", analysis);

    const id = await saveAnalysis(analysis);
    console.log(`Analyysi tallennettu ID:llä ${id}`);

    revalidatePath(`/analysis/${id}`);
    return { id, analysisUrl: `/analysis/${id}` };
  } catch (error) {
    console.error("Virhe analyysin tallennuksessa:", error);
    throw error;
  }
}
