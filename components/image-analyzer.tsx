"use client";
import { useAnalyzeImage } from "@/lib/hooks/useAnalyzeImage";
import { useUploadFileStore } from "@/lib/store/store";
import { useStyleStore } from "@/lib/store/useStyleStore"; // Oletan, että tämä on oikea polku
import { PartialImageAnalysis } from "@/lib/types";
import { getSchemaByPlatform } from "@/lib/utils";
import { experimental_useObject as useObject } from "ai/react";
import { useEffect, useRef } from "react";
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
  const { activeSection, setActiveSection } = useStyleStore();
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
      setActiveSection("analysisSection");
      if (analysisSectionRef.current) {
        analysisSectionRef.current.scrollIntoView({ behavior: "smooth" });
      }
    },
    onError(error: { message: string }) {
      console.error("Analysis error:", JSON.parse(error.message).error);
      toast.error("An error occurred during analysis");
    },
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const initialViewRef = useRef<HTMLDivElement>(null);
  const imagePreviewRef = useRef<HTMLDivElement>(null);
  const analysisSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(
              entry.target.id as
                | "initialView"
                | "imagePreview"
                | "analysisSection"
            );
          }
        });
      },
      { threshold: 0.6 }
    );

    const sections = [initialViewRef, imagePreviewRef, analysisSectionRef];
    sections.forEach((section) => {
      if (section.current) {
        observer.observe(section.current);
      }
    });

    return () => observer.disconnect();
  }, [setActiveSection]);

  useEffect(() => {
    if (previewUrl && imagePreviewRef.current) {
      imagePreviewRef.current.scrollIntoView({ behavior: "smooth" });
      setActiveSection("imagePreview");
    }
  }, [previewUrl, setActiveSection]);

  useEffect(() => {
    if (activeSection === "initialView" && initialViewRef.current) {
      initialViewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeSection]);

  const handleAnalyzeClick = () => {
    handleAnalyze(submit);
    setActiveSection("analysisSection");
    if (analysisSectionRef.current) {
      analysisSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
    <div
      ref={containerRef}
      className="space-y-24 scroll-smooth overflow-y-auto"
      style={{ height: "100vh" }}
    >
      <section
        id="initialView"
        ref={initialViewRef}
        className={`min-h-screen flex flex-col justify-center items-center transition-opacity duration-500 ${
          activeSection === "initialView" ? "opacity-100" : "opacity-50"
        }`}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {getTitle()}
        </h1>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InitialView />
        </div>
      </section>

      <section
        id="imagePreview"
        ref={imagePreviewRef}
        className={`min-h-screen flex flex-col justify-center items-center transition-opacity duration-500 ${
          activeSection === "imagePreview" ? "opacity-100" : "opacity-50"
        }`}
      >
        {previewUrl && (
          <Card className="container p-6 rounded-lg shadow-lg">
            <ImagePreview
              onAnalyze={handleAnalyzeClick}
              isLoading={isAiLoading}
            />
          </Card>
        )}
      </section>

      <section
        id="analysisSection"
        ref={analysisSectionRef}
        className={`min-h-screen flex flex-col justify-center items-center transition-all duration-500 ${
          activeSection === "analysisSection" && object?.analysis
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none h-0 overflow-hidden"
        }`}
      >
        {isAiLoading && <ModalSpinner />}
        {object?.analysis && <AnalysisSection analysis={object.analysis} />}
      </section>
    </div>
  );
}
