"use client";
import React, { useEffect, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "@/components/ui/button";
import { experimental_useObject as useObject } from "ai/react";
import {
  imageAnalysisSchema,
  PartialImageAnalysis,
  ImageAnalysis,
} from "@/app/api/image-analysis/schema";
import Image from "next/image";
import ShareButton from "./share-button";
import Link from "next/link";

export function UploadFile() {
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [analysisUrl, setAnalysisUrl] = useState<string | null>(null);
  const { object, submit, isLoading } = useObject<{
    analysis: PartialImageAnalysis;
  }>({
    api: "/api/image-analysis",
    schema: imageAnalysisSchema,
  });

  const handleAnalyze = async () => {
    if (previewUrl) {
      submit({ image: previewUrl });
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
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/analysis/${id}`;
      console.log(`Luotu URL: ${url}`);
      setAnalysisUrl(url);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
      <FileUpload onChange={handleFileUpload} />
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
      {files.length > 0 && (
        <Button onClick={handleAnalyze} className="mt-4" disabled={isLoading}>
          {isLoading ? "Analysoidaan..." : "Analysoi kuva"}
        </Button>
      )}
      {object?.analysis && (
        <div className="space-y-4 flex flex-col items-center justify-center">
          <ImageAnalysisView
            analysis={object.analysis as ImageAnalysis}
            imageUrl={previewUrl || ""}
          />
          <Button onClick={handleSaveAnalysis} className="mt-4">
            Tallenna analyysi
          </Button>
          {analysisId && (
            <ShareButton
              productId={analysisId}
              title={object.analysis.furniture}
              description={object.analysis.description}
              hashtags={object.analysis.hashtags?.filter(
                (tag): tag is string => tag !== undefined,
              )}
            />
          )}
          {analysisUrl && (
            <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">
              <p>Analyysin URL:</p>
              <Link
                href={analysisUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {analysisUrl}
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const ImageAnalysisView = ({
  analysis,
  imageUrl,
}: {
  analysis: ImageAnalysis;
  imageUrl: string;
}) => (
  <div className="mt-8 p-6 bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-w-xl mx-auto">
    <div className="flex items-center justify-center mb-4">
      {imageUrl && (
        <div className="relative w-full aspect-square max-w-[300px]">
          <Image
            src={imageUrl}
            alt={analysis.furniture}
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 300px) 100vw, 300px"
          />
        </div>
      )}
    </div>
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3">
      {analysis.furniture}
    </h2>
    {analysis.price && (
      <p className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
        Hinta: {analysis.price}
      </p>
    )}
    <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
      Tärkeimmät ominaisuudet:
    </p>
    <ul className="list-disc list-inside mb-4">
      {analysis.keyFeatures && analysis.keyFeatures.length > 0 ? (
        analysis.keyFeatures.map((feature, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-200">
            {feature}
          </li>
        ))
      ) : (
        <li className="text-gray-700 dark:text-gray-200">
          Ei ominaisuuksia saatavilla
        </li>
      )}
    </ul>
    <p className="text-gray-700 dark:text-gray-200 mb-6">
      {analysis.description}
    </p>
    {analysis.callToAction && (
      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4">
        {analysis.callToAction}
      </p>
    )}
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        {analysis.hashtags ? analysis.hashtags.join(" ") : ""}
      </span>
    </div>
  </div>
);

export default ImageAnalysisView;
