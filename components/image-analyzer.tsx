"use client";
import { experimental_useObject as useObject } from "ai/react";
import { imageAnalysisSchema } from "@/lib/schemas";
import {
  FlexibleImageAnalysis,
  ImageAnalysis,
  PartialImageAnalysis,
} from "@/lib/types";
import { FileUploadSection } from "./file-upload";
import { AnalysisSection } from "./analysis-section";
import { AnalysisUrlSection } from "./analysis-url";
import { useUploadFileStore } from "@/lib/store/store";
import { removeBackGroundAction, saveAnalysisAction } from "@/lib/actions";
import { useCallback } from "react";
import toast from "react-hot-toast";

export function ImageAnalyzer() {
  const {
    previewUrl,
    analysisUrl,
    analysisOptions,
    setIsAnalysisComplete,
    setPreviewUrl,
    setAnalysisUrl,
    setAnalysisId,
    isLoading,
    setIsLoading,
    setAnalyzedImageUrl,
    files,
  } = useUploadFileStore();

  const {
    object,
    submit,
    isLoading: isAiLoading,
    error,
  } = useObject<{
    analysis: PartialImageAnalysis;
  }>({
    api: "/api/image-analysis",
    schema: imageAnalysisSchema,
    onFinish: () => {
      setIsAnalysisComplete(true);
      setIsLoading(false);
    },
    onError(error) {
      console.log("error tuli", JSON.parse(error.message).error);
      toast.error(JSON.parse(error.message).error);
    },
  });

  const handleAnalyze = useCallback(async () => {
    if (previewUrl && files.length > 0) {
      setIsLoading(true);
      try {
        let imageToAnalyze = previewUrl;

        if (analysisOptions.removeBackground) {
          const formData = new FormData();
          formData.append("file", files[0]);
          // const response = await fetch("/api/remove-background", {
          //   method: "POST",
          //   body: formData,
          // });

          // if (!response.ok) {
          //   throw new Error("Taustan poisto epäonnistui");
          // }

          // const { image } = await response.json();

          // Tulee jo base 64 muodossa
          const image = await removeBackGroundAction(formData);
          imageToAnalyze = image;
          setAnalyzedImageUrl(imageToAnalyze);
        } else {
          setAnalyzedImageUrl(previewUrl);
        }
        submit({ image: imageToAnalyze, options: analysisOptions });
      } catch (error) {
        console.error("Virhe kuvan käsittelyssä:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [
    previewUrl,
    files,
    analysisOptions,
    setIsLoading,
    setAnalyzedImageUrl,
    submit,
  ]);

  const handleSaveAnalysis = async () => {
    if (object?.analysis && previewUrl) {
      try {
        const analysisToSave: FlexibleImageAnalysis = {
          ...object.analysis,
          imageUrl: previewUrl,
        };

        const result = await saveAnalysisAction(analysisToSave);
        setAnalysisId(result.id);
        setAnalysisUrl(result.analysisUrl);
        toast.success("Analyysi tallennettu onnistuneesti");
      } catch (error) {
        console.error("Virhe analyysin tallennuksessa:", error);
        toast.error("Analyysin tallennus epäonnistui");
      }
    } else {
      toast.error("Analyysiä ei ole vielä tehty");
    }
  };

  return (
    <div className="w-full container mx-auto bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 p-4">
      <div>
        <FileUploadSection
          handleAnalyze={handleAnalyze}
          isLoading={isLoading || isAiLoading}
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
