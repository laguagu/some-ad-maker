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
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

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
    file,
    setFile,
  } = useUploadFileStore();
  const [showUpload, setShowUpload] = useState(true);
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
      setShowUpload(false);
    },
    onError(error) {
      console.log("error tuli", JSON.parse(error.message).error);
      toast.error(JSON.parse(error.message).error);
    },
  });

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

  const handleReupload = () => {
    setShowUpload(true);
    setFile(null);
    setPreviewUrl(null);
    setAnalyzedImageUrl(null);
    setIsAnalysisComplete(false);
    setAnalysisUrl(null);
  };

  return (
    <div className="bg-white bg-opacity-80 w-full container mx-auto border-neutral-200 dark:border-neutral-800 p-4 sm:p-6">
      {showUpload ? (
        <FileUploadSection
          handleAnalyze={handleAnalyze}
          isLoading={isLoading || isAiLoading}
        />
      ) : object?.analysis ? (
        <>
          <AnalysisSection analysis={object.analysis} />
          <div className="flex flex-col sm:flex-row gap-4 justify-center align-middle my-6">
            <Button onClick={handleReupload} className="w-full sm:w-auto">
              Lataa uusi kuva
            </Button>
            <Button onClick={handleSaveAnalysis} className="w-full sm:w-auto">
              Tallenna myynti-ilmoitus
            </Button>
          </div>
        </>
      ) : null}
      {analysisUrl && <AnalysisUrlSection analysisUrl={analysisUrl} />}
    </div>
  );
}
