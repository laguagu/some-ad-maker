import Image from "next/image";
import { AnalysisOptions } from "./analysis-options";
import { FileUpload, GridPattern } from "./ui/file-upload";
import { Button } from "./ui/button";
import { useUploadFileStore } from "@/lib/store/store";
import { Separator } from "./ui/separator";

interface FileUploadSectionProps {
  handleAnalyze: () => Promise<void>;
}

export function FileUploadSection({ handleAnalyze }: FileUploadSectionProps) {
  const { previewUrl, files, isLoading, setFiles, setPreviewUrl } =
    useUploadFileStore();

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
      <FileUpload onChange={handleFileUpload} />
      {previewUrl && (
        <div className="relative mt-4 w-[450px] h-[450px] p-10 ">
          <Image
            src={previewUrl}
            alt="Esikatselu"
            fill
            className="py-4 rounded-xl shadow-2xl border-y-2"
            style={{ objectFit: "contain" }}
          />
        </div>
      )}
      <Separator />
      <div className="flex flex-col items-start gap-2 ">
        <AnalysisOptions />
        {files.length > 0 && (
          <Button onClick={handleAnalyze} className="mt-4" disabled={isLoading}>
            {isLoading ? "Analysoidaan..." : "Analysoi kuva"}
          </Button>
        )}
      </div>
    </div>
  );
}
