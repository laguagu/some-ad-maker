import { useUploadFileStore } from "@/lib/store/store";
import { StreamedAnalysis } from "@/lib/types";
import { useEffect } from "react";
import { FloatingNav } from "./nav/floating-nav";
import { ViewRenderer } from "./view-render";

type AnalysisSectionProps = {
  analysis: StreamedAnalysis;
};

export function AnalysisSection({ analysis }: AnalysisSectionProps) {
  const {
    analyzedImageUrl,
    analysisOptions,
    currentView,
    isAnalysisComplete,
    setFile,
    setPreviewUrl,
    setAnalyzedImageUrl,
    setIsAnalysisComplete,
    setAnalysisUrl,
    setAnalysisId,
  } = useUploadFileStore();

  const handleReupload = () => {
    setFile(null);
    setPreviewUrl(null);
    setAnalyzedImageUrl(null);
    setIsAnalysisComplete(false);
    setAnalysisUrl(null);
    setAnalysisId(null);
  };

  useEffect(() => {
    console.log("analysis", analysis);
  }, [analysis]);
  return (
    <div className="relative pb-16">
      <ViewRenderer
        currentView={currentView}
        analysis={analysis}
        imageUrl={analyzedImageUrl || ""}
        showColorScheme={analysisOptions.includeColorScheme}
      />
      <FloatingNav
        onReupload={handleReupload}
        isAnalysisComplete={isAnalysisComplete}
      />
    </div>
  );
}
