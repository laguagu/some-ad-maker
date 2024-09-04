import React from "react";
import { Button } from "./ui/button";
import { useUploadFileStore } from "@/lib/store/store";
import { revalidatePath } from "next/cache";

export const ImageReuploadToggle = () => {
  const {
    setFile: setFiles,
    setPreviewUrl,
    setIsAnalysisComplete,
  } = useUploadFileStore();

  const handleReupload = () => {
    console.log("Reuploading image");
    setFiles(null);
    setPreviewUrl(null);
    setIsAnalysisComplete(false);
  };

  return (
    <Button onClick={handleReupload} className="mt-4">
      Upload New Image
    </Button>
  );
};
