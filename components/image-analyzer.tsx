"use client";
import { experimental_useObject as useObject } from "ai/react";
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
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { getSchemaByPlatform } from "@/lib/utils";
import ShareButton from "./share-button";

export function ImageAnalyzer() {
  const {
    previewUrl,
    analysisUrl,
    analysisId,
    analysisOptions,
    isLoading,
    file,
    setIsAnalysisComplete,
    setPreviewUrl,
    setAnalysisUrl,
    setAnalysisId,
    setIsLoading,
    setAnalyzedImageUrl,
    setFile,
  } = useUploadFileStore();
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
    /*
A unique identifier. If not provided, a random one will be generated. When provided, the `useObject` hook with the same `id` will have shared states across components.
    */
    id: analysisId || undefined,
    onFinish: () => {
      setIsAnalysisComplete(true);
      setIsLoading(false);
      // setShowUpload(false);
    },
    onError(error: { message: string }) {
      console.log("error tuli", JSON.parse(error.message).error);
      toast.error(JSON.parse(error.message).error);
    },
  });

  useEffect(() => {
    console.log("object", object);
  }, [object]);

  const handleAnalyze = useCallback(async () => {
    if (previewUrl && file) {
      setIsLoading(true);
      try {
        let imageToAnalyze = previewUrl;

        if (analysisOptions.removeBackground) {
          const formData = new FormData();
          formData.append("file", file);
          const image = await removeBackGroundAction(formData);
          imageToAnalyze = image;
          setAnalyzedImageUrl(imageToAnalyze);
        } else {
          setAnalyzedImageUrl(previewUrl);
        }
        // Generate a new analysis id
        const newAnalysisId = `analysis-${Date.now()}`;
        setAnalysisId(newAnalysisId);

        await submit({ image: imageToAnalyze, options: analysisOptions });
      } catch (error) {
        console.error("Error processing image:", error);
        toast.error("An error occurred while processing the image");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please upload an image first");
    }
  }, [
    previewUrl,
    file,
    analysisOptions,
    setIsLoading,
    setAnalysisId,
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

  const handleReupload = () => {
    // Reset all relevant states
    setFile(null);
    setPreviewUrl(null);
    setAnalyzedImageUrl(null);
    setIsAnalysisComplete(false);
    setAnalysisUrl(null);
    setAnalysisId(null);
  };

  return (
    <div className="w-full container mx-auto border-neutral-200 dark:border-neutral-800 p-4 sm:p-6 bg-white bg-opacity-85">
      {!object?.analysis ? (
        <FileUploadSection
          handleAnalyze={handleAnalyze}
          isLoading={isLoading || isAiLoading}
        />
      ) : (
        <>
          <div>
            <AnalysisSection analysis={object.analysis} />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center align-middle my-6">
            <Button onClick={handleReupload} className="w-full sm:w-auto">
              Lataa uusi kuva
            </Button>
            <Button onClick={handleSaveAnalysis} className="w-full sm:w-auto">
              Tallenna myynti-ilmoitus
            </Button>
          </div>

          {analysisUrl && (
            <div className="flex justify-center flex-col items-center h-full">
              <ShareButton analysis={object.analysis} />
              <AnalysisUrlSection analysisUrl={analysisUrl} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
