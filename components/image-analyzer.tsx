"use client";
import { experimental_useObject as useObject } from "ai/react";
import { PartialImageAnalysis } from "@/lib/types";
import { AnalysisSection } from "./analysis-section";
import { useUploadFileStore } from "@/lib/store/store";
import toast from "react-hot-toast";
import { getSchemaByPlatform } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImagePreview } from "./image-preview";
import { useAnalyzeImage } from "@/lib/hooks/useAnalyzeImage";
import { InitialView } from "./initial-view";

export function ImageAnalyzer() {
  const {
    previewUrl,
    analysisId,
    analysisOptions,
    setIsAnalysisComplete,
    setIsLoading,
  } = useUploadFileStore();
  const { handleAnalyze } = useAnalyzeImage();

  const schema = getSchemaByPlatform(analysisOptions.platform);
  const {
    object,
    submit,
    isLoading: isAiLoading,
    error,
  } = useObject<{
    analysis: PartialImageAnalysis;
  }>({
    api: "/api/image-analysis",
    schema: schema,
    id: analysisId || undefined,
    onFinish: () => {
      setIsAnalysisComplete(true);
      setIsLoading(false);
    },
    onError(error: { message: string }) {
      console.error("Analysis error:", JSON.parse(error.message).error);
      toast.error("An error occurred during analysis");
    },
  });

  const getTitle = () => {
    if (!previewUrl) return "Tekoälyllä tehostettu myynti-ilmoitusten luonti";
    if (!object?.analysis) return "Kuvan analysointi";
    return "Myynti-ilmoituksen esikatselu";
  };

  return (
    <div className="container max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {getTitle()}
      </h1>
      {!object?.analysis ? (
        !previewUrl ? (
          <Card className="p-6 rounded-lg shadow-lg">
            <InitialView />
          </Card>
        ) : (
          <Card className="p-6 rounded-lg shadow-lg">
            <ImagePreview
              onAnalyze={() => handleAnalyze(submit)}
              isLoading={isAiLoading}
            />
          </Card>
        )
      ) : (
        <AnalysisSection analysis={object.analysis} />
      )}
    </div>
  );
}
