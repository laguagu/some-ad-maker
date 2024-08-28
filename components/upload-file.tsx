"use client";
import { experimental_useObject as useObject } from "ai/react";
import { imageAnalysisSchema } from "@/lib/schemas";
import { PartialImageAnalysis } from "@/lib/types";
import { FileUploadSection } from "./file-upload";
import { AnalysisSection } from "./analysis-section";
import { AnalysisUrlSection } from "./analysis-url";
import { useUploadFileStore } from "@/lib/store/store";
import { Separator } from "./ui/separator";

export function ImageAnalyzer() {
  const {
    isAnalysisComplete,
    previewUrl,
    analysisUrl,
    analysisOptions,
    setIsAnalysisComplete,
    setFiles,
    setPreviewUrl,
    setAnalysisUrl,
    setAnalysisId,
    setIsLoading,
  } = useUploadFileStore();

  const { object, submit, isLoading, error } = useObject<{
    analysis: PartialImageAnalysis;
  }>({
    api: "/api/image-analysis",
    schema: imageAnalysisSchema,
    onFinish: () => {
      setIsAnalysisComplete(true);
      setIsLoading(false);
      setPreviewUrl(null);
    },
  });

  const handleAnalyze = async () => {
    if (previewUrl) {
      setIsLoading(true);
      submit({ image: previewUrl, options: analysisOptions });
    }
  };

  const handleFileUpload = (files: File[]) => {
    setFiles(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(files[0]);
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
        <FileUploadSection
          handleFileUpload={handleFileUpload}
          handleAnalyze={handleAnalyze}
        />
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
