import Image from "next/image";
import { AnalysisOptions } from "./analysis-options";
import { FileUpload } from "./ui/file-upload";
import { Button } from "./ui/button";
import { useUploadFileStore } from "@/lib/store/store";
import { Separator } from "./ui/separator";

interface FileUploadSectionProps {
  handleAnalyze: () => Promise<void>;
  isLoading: boolean;
}

export function FileUploadSection({
  handleAnalyze,
  isLoading,
}: FileUploadSectionProps) {
  const { previewUrl, file, setFile, setPreviewUrl } = useUploadFileStore();

  const handleFileUpload = (uploadedFile: File | null) => {
    setFile(uploadedFile);
    if (uploadedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(uploadedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="relative flex flex-col items-center space-y-4 border border-dashed border-neutral-200 rounded-lg p-4 sm:p-6">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-stretch gap-4">
        <div className="">
          <FileUpload onChange={handleFileUpload} />
        </div>
        <div className="w-full sm:w-1/2 sm:border-l sm:border-neutral-200 sm:pl-4 flex items-center justify-center">
          <AnalysisOptions />
        </div>
      </div>
      {previewUrl && (
        <div className="relative mt-6 w-full max-w-[300px] sm:max-w-[400px] h-[300px] sm:h-[400px] mx-auto">
          <Image
            src={previewUrl}
            alt="Esikatselu"
            fill
            className="rounded-lg shadow-lg"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
      <div className="w-full sm:w-auto">
        {file && (
          <Button
            onClick={handleAnalyze}
            className="w-full sm:w-auto mt-4"
            disabled={isLoading}
          >
            {isLoading ? "Analysoidaan..." : "Analysoi kuva"}
          </Button>
        )}
      </div>
    </div>
  );
}
