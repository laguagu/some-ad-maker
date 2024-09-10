"use client";
import { useAnalyzeImage } from "@/lib/hooks/useAnalyzeImage";
import { useUploadFileStore } from "@/lib/store/store";
import { PartialImageAnalysis } from "@/lib/types";
import { getSchemaByPlatform } from "@/lib/utils";
import { experimental_useObject as useObject } from "ai/react";
import toast from "react-hot-toast";
import { AnalysisSection } from "./analysis-section";
import { ImagePreview } from "./image-preview";
import { InitialView } from "./initial-view";
import ModalSpinner from "./loaders/modal-spinner";
import { Card } from "./ui/card";
import { TextGenerateEffect } from "./ui/text-generate-effect";

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
    if (!previewUrl)
      return (
        <TextGenerateEffect
          words={"Tekoälyllä tehostettu myynti-ilmoitusten luonti"}
        />
      );
    if (!object?.analysis) return "Kuvan analysointi";
    return "Myynti-ilmoituksen esikatselu";
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {getTitle()}
      </h1>
      {!object?.analysis ? (
        !previewUrl ? (
          <Card className="p-6 rounded-lg shadow-lg">
            <InitialView />
          </Card>
        ) : (
          <Card className="container p-6 rounded-lg shadow-lg">
            <ImagePreview
              onAnalyze={() => handleAnalyze(submit)}
              isLoading={isAiLoading}
            />
          </Card>
        )
      ) : (
        <div>
          {isAiLoading && <ModalSpinner />}
          <AnalysisSection analysis={object.analysis} />
        </div>
      )}
    </div>
  );
}
