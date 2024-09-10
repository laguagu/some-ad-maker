"use client";
import { useAnalyzeImage } from "@/lib/hooks/useAnalyzeImage";
import { useUploadFileStore } from "@/lib/store/store";
import { useStyleStore } from "@/lib/store/useStyleStore";
import { PartialImageAnalysis } from "@/lib/types";
import { getSchemaByPlatform } from "@/lib/utils";
import { experimental_useObject as useObject } from "ai/react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
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
    setFile,
    setPreviewUrl,
  } = useUploadFileStore();
  const { currentLayout, setCurrentLayout } = useStyleStore();
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
      setCurrentLayout("analysis");
    },
    onError(error: { message: string }) {
      console.error("Analysis error:", JSON.parse(error.message).error);
      toast.error("An error occurred during analysis");
    },
  });

  const getTitle = () => {
    if (currentLayout === "initial")
      return "Mainos-Mestari - Myynti-ilmoituksen luonti";
    if (currentLayout === "preview") return "Kuvan analysointi";
    return "Myynti-ilmoituksen esikatselu";
  };

  useEffect(() => {
    if (previewUrl) {
      setCurrentLayout("preview");
    } else {
      setCurrentLayout("initial");
    }
  }, [previewUrl, setCurrentLayout]);

  const variants = {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleGoBack = () => {
    setCurrentLayout("initial");
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      
      <AnimatePresence mode="wait">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {currentLayout === "initial" ? (
            <TextGenerateEffect words={getTitle()} />
          ) : (
            getTitle()
          )}
          {/* {getTitle()} */}
        </h1>
        {currentLayout === "initial" && (
          <motion.div
            key="initial"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="md:p-10 p-4 rounded-lg shadow-lg bg-slate-200">
              <InitialView />
            </Card>
          </motion.div>
        )}
        {currentLayout === "preview" && (
          <motion.div
            key="preview"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Card className="container p-6 rounded-lg shadow-lg">
              <ImagePreview
                onAnalyze={() => handleAnalyze(submit)}
                isLoading={isAiLoading}
                onGoBack={handleGoBack}
              />
            </Card>
          </motion.div>
        )}
        {currentLayout === "analysis" && (
          <motion.div
            key="analysis"
            variants={variants}
            initial="initial"
            animate="enter"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {isAiLoading && <ModalSpinner />}
            {object?.analysis && <AnalysisSection analysis={object.analysis} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
