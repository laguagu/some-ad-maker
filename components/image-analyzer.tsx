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
    },
    onError(error: { message: string }) {
      console.error("Analysis error:", JSON.parse(error.message).error);
      toast.error("An error occurred during analysis");
    },
  });

  const getTitle = () => {
    if (currentLayout === "initial")
      return "Mainos-Mestari 🪄  Myynti-ilmoituksen luonti";
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

  // Määrittelee animaatiovariantit lapsielementeille
  const childVariants = {
    initial: { opacity: 0, y: 20 }, // Alkuarvo: näkymätön ja siirtynyt 20 yksikköä alaspäin
    enter: { opacity: 1, y: 0 }, // Sisääntulo: näkyvä ja siirtynyt takaisin alkuperäiseen paikkaan
    exit: { opacity: 0, y: -20 }, // Poistuminen: näkymätön ja siirtynyt 20 yksikköä ylöspäin
  };

  // Määrittelee animaatiovariantit kontainerille
  const containerVariants = {
    initial: { opacity: 0, y: 20 }, // Alkuarvo: näkymätön ja siirtynyt 20 yksikköä alaspäin
    enter: {
      opacity: 1,
      y: 0, // Sisääntulo: näkyvä ja siirtynyt takaisin alkuperäiseen paikkaan
      transition: {
        when: "beforeChildren", // Animaatio tapahtuu ennen lapsielementtien animaatioita
        staggerChildren: 0.1, // Lapsielementtien animaatiot tapahtuvat 0.1 sekunnin välein
        delayChildren: 0.1, // Lapsielementtien animaatiot alkavat 0.1 sekunnin viiveellä
      },
    },
    exit: {
      opacity: 0,
      y: -20, // Poistuminen: näkymätön ja siirtynyt 20 yksikköä ylöspäin
      transition: {
        when: "afterChildren", // Animaatio tapahtuu lapsielementtien animaatioiden jälkeen
        staggerChildren: 0.1, // Lapsielementtien animaatiot tapahtuvat 0.1 sekunnin välein
        staggerDirection: -1, // Lapsielementtien animaatiot tapahtuvat käänteisessä järjestyksessä
      },
    },
  };

  const handleGoBack = () => {
    setCurrentLayout("initial");
    setFile(null);
    setPreviewUrl(null);
  };

  const handleStartAnalysis = async () => {
    await handleAnalyze(submit);
    setCurrentLayout("analysis");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {/* <InstagramPost analysis={mockAnalysis} /> */}
        <motion.div
          key={currentLayout}
          variants={containerVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <motion.h1
            className="text-2xl font-bold text-gray-800 my-6 text-center"
            variants={childVariants}
          >
            {currentLayout === "initial" ? (
              <TextGenerateEffect words={getTitle()} />
            ) : (
              getTitle()
            )}
          </motion.h1>

          {currentLayout === "initial" && (
            <Card className="md:p-10 p-4 rounded-lg shadow-lg bg-slate-200">
              <InitialView />
            </Card>
          )}
          {currentLayout === "preview" && (
            <motion.div variants={childVariants}>
              <Card className="container p-6 rounded-lg shadow-lg">
                <ImagePreview
                  onAnalyze={handleStartAnalysis}
                  isLoading={isAiLoading}
                  onGoBack={handleGoBack}
                />
              </Card>
            </motion.div>
          )}
          {currentLayout === "analysis" && (
            <motion.div variants={childVariants}>
              {isAiLoading && <ModalSpinner />}
              {object?.analysis && (
                <AnalysisSection analysis={object.analysis} />
              )}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
