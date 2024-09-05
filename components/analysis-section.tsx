import React, { useMemo } from "react";
import { StreamedAnalysis } from "@/lib/types";
import { ViewRenderer } from "./view-render";
import { useUploadFileStore } from "@/lib/store/store";
import { FloatingNav } from "./floating-nav";
import { Card } from "./ui/card"; // shadcn component
import { NavItems } from "./nav/nav-items";

type AnalysisSectionProps = {
  analysis: StreamedAnalysis;
};

export function AnalysisSection({ analysis }: AnalysisSectionProps) {
  const {
    analyzedImageUrl,
    analysisOptions,
    currentView,
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

  return (
    <div className="mt-4 sm:mt-8 relative">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">
        Myynti-ilmoitus
      </h3>
      <Card>
        <ViewRenderer
          currentView={currentView}
          analysis={analysis}
          imageUrl={analyzedImageUrl || ""}
          showColorScheme={analysisOptions.includeColorScheme}
        />
      </Card>
      <FloatingNav onReupload={handleReupload} />
    </div>
  );
}
