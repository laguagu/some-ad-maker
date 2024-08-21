"use client";
import React, { useRef, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { experimental_useObject as useObject } from "ai/react";
import {
  imageAnalysisSchema,
  PartialImageAnalysis,
  ImageAnalysis,
} from "@/lib/schemas";
import Image from "next/image";
import { Tag, Info, ShoppingCart, Palette, Eye } from "lucide-react";
import { AnalysisOptions } from "./analysis-options";
import { useRouter } from "next/navigation";
import { DraggableAdLayout } from "./drag-and-drop/layout";

export function UploadFile() {
  const router = useRouter();
  const analysisRef = useRef<HTMLDivElement>(null);
  const [adLayout, setAdLayout] = useState(null);
  const [files, setFiles] = useState<File[]>([]);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(
    null,
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [analysisUrl, setAnalysisUrl] = useState<string | null>(null);
  const [analysisOptions, setAnalysisOptions] = useState<AnalysisOptions>({
    includeColorScheme: true,
    styleTheme: "modern",
  });
  const { object, submit, isLoading, error } = useObject<{
    analysis: PartialImageAnalysis;
  }>({
    api: "/api/image-analysis",
    schema: imageAnalysisSchema,
  });

  const handleAnalyze = async () => {
    if (previewUrl) {
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
      console.log("Yritetään tallentaa analyysi:", {
        ...object.analysis,
        imageUrl: previewUrl,
      });
      const response = await fetch("/api/save-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...object.analysis, imageUrl: previewUrl }),
      });
      const { id } = await response.json();
      console.log(`Analyysi tallennettu, saatu ID: ${id}`);
      setAnalysisId(id);
      const url = `/analysis/${id}`;
      console.log(`Luotu URL: ${url}`);
      setAnalysisUrl(url);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
      <FileUpload onChange={handleFileUpload} />
      <div className="flex gap-2 flex-col items-center space-y-2">
        {previewUrl && (
          <div className="mt-4 relative w-[200px] h-[200px]">
            <Image
              src={previewUrl}
              alt="Esikatselu"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
        <div className="flex flex-col items-start gap-2">
          <AnalysisOptions
            options={analysisOptions}
            onChange={setAnalysisOptions}
          />
          {files.length > 0 && (
            <Button
              onClick={handleAnalyze}
              className="mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Analysoidaan..." : "Analysoi kuva"}
            </Button>
          )}
        </div>
      </div>
      {object?.analysis && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Muokattava myynti-ilmoitus</h3>
          <div ref={analysisRef}>
            <DraggableAdLayout
              adData={
                {
                  ...object.analysis,
                  furniture: object.analysis.furniture,
                  keyFeatures: object.analysis.keyFeatures,
                  description: object.analysis.description,
                  hashtags: object.analysis.hashtags,
                  callToAction: object.analysis.callToAction,
                  visualDesign: object.analysis.visualDesign,
                  imageUrl: previewUrl || null,
                  price: object.analysis.price || null,
                  colorScheme: object.analysis.colorScheme,
                } as ImageAnalysis
              }
            />
          </div>
          <div className="flex gap-4">
            <Button onClick={handleSaveAnalysis} className="mt-4">
              Tallenna myynti-ilmoitus
            </Button>
          </div>
        </div>
      )}
      {analysisUrl && (
        <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">
          <p>Analyysin URL:</p>
          <a
            href={analysisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {analysisUrl}
          </a>
        </div>
      )}
    </div>
  );
}

const ImageAnalysisView = ({
  analysis,
  imageUrl,
  showColorScheme,
}: {
  analysis: Partial<ImageAnalysis>;
  imageUrl: string;
  showColorScheme: boolean;
}) => {
  return (
    <div className="mt-8 space-y-8">
      {/* Myynti-ilmoitus */}
      <div className="p-6 bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-w-xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          {imageUrl && (
            <div className="relative w-full aspect-square max-w-[300px]">
              <Image
                src={imageUrl}
                alt={analysis.furniture || "Kuva analysoidusta tuotteesta"}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 300px) 100vw, 300px"
                className="rounded-lg"
              />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <Tag className="mr-2" size={24} />
          {analysis.furniture}
        </h2>
        {analysis.price && (
          <p className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
            Hinta: {analysis.price}
          </p>
        )}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
            Tärkeimmät ominaisuudet:
          </h3>
          <ul className="list-none space-y-2">
            {analysis.keyFeatures && analysis.keyFeatures.length > 0 ? (
              analysis.keyFeatures.map((feature, index: number) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-200 flex items-center"
                >
                  <div className="mr-2 text-blue-500">•</div>
                  {feature}
                </li>
              ))
            ) : (
              <li className="text-gray-700 dark:text-gray-200">
                Ei ominaisuuksia saatavilla
              </li>
            )}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
            <Info className="mr-2" size={24} />
            Kuvaus:
          </h3>
          <p className="text-gray-700 dark:text-gray-200">
            {analysis.description}
          </p>
        </div>
        {showColorScheme && analysis.colorScheme && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
              <Palette className="mr-2" size={24} />
              Värimaailma:
            </h3>
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: analysis.colorScheme.primary }}
                title="Pääväri"
              ></div>
              {analysis.colorScheme.secondary && (
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: analysis.colorScheme.secondary }}
                  title="Toissijainen väri"
                ></div>
              )}
              {analysis.colorScheme.accent && (
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: analysis.colorScheme.accent }}
                  title="Korostusväri"
                ></div>
              )}
            </div>
            <p className="text-gray-700 dark:text-gray-200 mt-2">
              Pääväri: {analysis.colorScheme.primary}
              {analysis.colorScheme.secondary &&
                `, Toissijainen: ${analysis.colorScheme.secondary}`}
              {analysis.colorScheme.accent &&
                `, Korostus: ${analysis.colorScheme.accent}`}
            </p>
          </div>
        )}
        {analysis.callToAction && (
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center">
            <ShoppingCart className="mr-2" size={24} />
            {analysis.callToAction}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-4">
          {analysis.hashtags &&
            analysis.hashtags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      {/* Visuaalinen ilme-ehdotus */}
      {analysis.visualDesign && (
        <div className="p-6 bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-w-xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
            <Eye className="mr-2" size={24} />
            Visuaalinen ilme-ehdotus:
          </h3>
          <p className="text-gray-700 dark:text-gray-200">
            {analysis.visualDesign}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysisView;
