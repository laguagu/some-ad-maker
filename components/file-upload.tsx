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
  const { previewUrl, files, setFiles, setPreviewUrl } = useUploadFileStore();

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

  return (
    <div className="relative flex gap-2 flex-col items-center space-y-2 border border-dashed border-neutral-200 rounded-lg p-4">
      <div className="flex  flex-row items-center gap-2">
        <FileUpload onChange={handleFileUpload} />
        <div className="border-l-2 border-neutral-300 pl-8">
          <AnalysisOptions />
        </div>
      </div>
      {previewUrl && (
        <div className="relative mt-4 w-full max-w-[450px] h-[450px] mx-auto">
          <Image
            src={previewUrl}
            alt="Esikatselu"
            fill
            className="py-4 rounded-xl shadow-2xl border-y-2"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
      <div className="s">
        {files.length > 0 && (
          <Button onClick={handleAnalyze} className="mt-4" disabled={isLoading}>
            {isLoading ? "Analysoidaan..." : "Analysoi kuva"}
          </Button>
        )}
      </div>
    </div>
  );
}
