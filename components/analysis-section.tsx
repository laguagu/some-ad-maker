import React, { use, useEffect, useMemo } from "react";
import { StreamedAnalysis } from "@/lib/types";
import { ViewRenderer } from "./view-render";
import { useUploadFileStore } from "@/lib/store/store";
import { FloatingNav } from "./nav/floating-nav";
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

  useEffect(() => {
    console.log("analysis", analysis);
  }, [analysis]);
  return (
    <div className="relative pb-16">
      {" "}
      {/* Lisätty padding-top */}
      <ViewRenderer
        currentView={currentView}
        analysis={analysis}
        imageUrl={analyzedImageUrl || ""}
        showColorScheme={analysisOptions.includeColorScheme}
      />
      <FloatingNav onReupload={handleReupload} />
    </div>
  );
}
