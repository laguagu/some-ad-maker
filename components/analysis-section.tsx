import { useUploadFileStore } from "@/lib/store/store";
import { useStyleStore } from "@/lib/store/useStyleStore";
import { StreamedAnalysis } from "@/lib/types";
import { useCallback, useEffect } from "react";
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
    setFile,
    setPreviewUrl,
    setAnalyzedImageUrl,
    setIsAnalysisComplete,
    setAnalysisUrl,
    setAnalysisId,
  } = useUploadFileStore();
  const { setActiveSection } = useStyleStore();

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleReupload = useCallback(() => {
    // Scroll back to the top of the page
    scrollToTop();

    // Use setTimeout to ensure state updates happen after scrolling
    setTimeout(() => {
      setFile(null);
      setPreviewUrl(null);
      setAnalyzedImageUrl(null);
      setIsAnalysisComplete(false);
      setAnalysisUrl(null);
      setAnalysisId(null);
      setActiveSection("initialView");
    }, 100);
  }, [
    setFile,
    setPreviewUrl,
    setAnalyzedImageUrl,
    setIsAnalysisComplete,
    setAnalysisUrl,
    setAnalysisId,
    setActiveSection,
    scrollToTop,
  ]);

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
      <FloatingNav onReupload={handleReupload} />
    </div>
  );
}
