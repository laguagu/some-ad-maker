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

  return (
    <Card className="container max-w-4xl">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">
          Tekoälyllä tehostettu myynti-ilmoitusten luonti
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {!object?.analysis ? (
          !previewUrl ? (
            <InitialView />
          ) : (
            <ImagePreview
              onAnalyze={() => handleAnalyze(submit)}
              isLoading={isAiLoading}
            />
          )
        ) : (
          <AnalysisSection analysis={object.analysis} />
        )}
      </CardContent>
    </Card>
  );
}
