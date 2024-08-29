"use client";
import { experimental_useObject as useObject } from "ai/react";
import { imageAnalysisSchema } from "@/lib/schemas";
import { PartialImageAnalysis } from "@/lib/types";
import { FileUploadSection } from "./file-upload";
import { AnalysisSection } from "./analysis-section";
import { AnalysisUrlSection } from "./analysis-url";
import { useUploadFileStore } from "@/lib/store/store";
import { removeBackGroundAction } from "@/lib/actions";

export function ImageAnalyzer() {
  const {
    previewUrl,
    analysisUrl,
    analysisOptions,
    setIsAnalysisComplete,
    setPreviewUrl,
    setAnalysisUrl,
    setAnalysisId,
    setIsLoading,
    files,
  } = useUploadFileStore();

  const { object, submit, isLoading, error } = useObject<{
    analysis: PartialImageAnalysis;
  }>({
    api: "/api/image-analysis",
    schema: imageAnalysisSchema,
    onFinish: () => {
      setIsAnalysisComplete(true);
      setIsLoading(false);
    },
  });

  const handleAnalyze = async () => {
    if (previewUrl && files.length > 0) {
      setIsLoading(true);
      try {
        let imageToAnalyze = previewUrl;
        if (analysisOptions.removeBackground) {
          imageToAnalyze = await removeBackGroundAction(files[0]);
        }
        submit({ image: imageToAnalyze, options: analysisOptions });
      } catch (error) {
        console.error("Virhe kuvan käsittelyssä:", error);
        setIsLoading(false);
      }
    }
  };

  const handleSaveAnalysis = async () => {
    if (object?.analysis && previewUrl) {
      const response = await fetch("/api/save-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...object.analysis, imageUrl: previewUrl }),
      });
      const { id } = await response.json();
      setAnalysisId(id);
      setAnalysisUrl(`/analysis/${id}`);
    }
  };

  return (
    <div className="w-full container mx-auto bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 p-4">
      <div>
        <FileUploadSection handleAnalyze={handleAnalyze} />
        {object?.analysis && (
          <AnalysisSection
            analysis={object.analysis}
            handleSaveAnalysis={handleSaveAnalysis}
          />
        )}
      </div>
      {analysisUrl && <AnalysisUrlSection analysisUrl={analysisUrl} />}
    </div>
  );
}
