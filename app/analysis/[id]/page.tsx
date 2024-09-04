import { getAnalysisById } from "@/lib/save-analysis";
import ImageAnalysisView from "@/components/image-analysis-view";

export default async function AnalysisPage({
  params,
}: {
  params: { id: string };
}) {
  console.log(`Yritetään hakea analyysi ID:llä ${params.id}`);
  const analysis = await getAnalysisById(params.id);

  if (!analysis) {
    console.log(`Analyysiä ei löytynyt ID:llä ${params.id}`);
    return <div>Analyysiä ei löytynyt</div>;
  }

  console.log(`Analyysi löytyi ID:llä ${params.id}`);
  return (
    <ImageAnalysisView
      analysis={analysis}
      imageUrl={analysis.imageUrl || ""}
      showColorScheme={true}
    />
  );
}
