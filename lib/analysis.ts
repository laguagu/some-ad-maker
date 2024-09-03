import { FlexibleImageAnalysis } from "./types";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "analysis.json");

// Varmista, että data-kansio on olemassa
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

// Lue analyysi tiedostosta
function readAnalysis(): FlexibleImageAnalysis | null {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, "utf8");
    return JSON.parse(data);
  }
  return null;
}

// Kirjoita analyysi tiedostoon
function writeAnalysis(analysis: FlexibleImageAnalysis) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(analysis, null, 2));
}

export async function saveAnalysis(
  data: FlexibleImageAnalysis,
): Promise<string> {
  writeAnalysis(data);
  console.log(`Analyysi tallennettu:`, data);
  return "latest"; // Käytämme "latest" ID:nä, koska meillä on vain yksi analyysi, voi vaihtaa UUID:ksi
}

export async function getAnalysisById(
  id: string,
): Promise<FlexibleImageAnalysis | null> {
  console.log(`Haetaan analyysi`);
  const analysis = readAnalysis();
  if (analysis) {
    console.log(`Analyysi löytyi:`, analysis);
    return analysis;
  } else {
    console.log(`Analyysiä ei löytynyt`);
    return null;
  }
}
