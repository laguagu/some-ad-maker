import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { ReuploadButton } from "./buttons/reupload";
import { AnalysisOptions } from "./analysis-options";
import { useUploadFileStore } from "@/lib/store/store";
import { Card } from "./ui/card";

interface ImagePreviewProps {
  onAnalyze: () => void;
  isLoading: boolean;
}

export function ImagePreview({ onAnalyze, isLoading }: ImagePreviewProps) {
  const { previewUrl, setFile, setPreviewUrl } = useUploadFileStore();

  const handleGoBack = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-between items-center">
      <div className="flex-1 p-4 border shadow-sm rounded-xl">
        <div className="w-full aspect-square max-w-sm mx-auto relative">
          <Image
            src={previewUrl!}
            alt="Esikatselu"
            fill
            className="rounded-lg  object-contain"
          />
        </div>
        <div className="mt-4 flex justify-center gap-4">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Takaisin
          </Button>
          <ReuploadButton />
        </div>
      </div>
      <div className="flex-1 md:border-l-2 pl-4">
        <AnalysisOptions />
        <Button
          onClick={onAnalyze}
          className="w-full mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Analysoidaan..." : "Luo myynti-ilmoitus"}
        </Button>
      </div>
    </div>
  );
}
