import { useCallback } from "react";
import { useUploadFileStore } from "@/lib/store/store";
import { removeBackGroundAction } from "@/lib/actions";
import toast from "react-hot-toast";

export function useAnalyzeImage() {
  const {
    previewUrl,
    file,
    analysisOptions,
    setIsLoading,
    setAnalysisId,
    setAnalyzedImageUrl,
  } = useUploadFileStore();

  const handleAnalyze = useCallback(
    async (submit: (input: any) => void) => {
      if (previewUrl && file) {
        setIsLoading(true);
        try {
          let imageToAnalyze = previewUrl;

          if (analysisOptions.removeBackground) {
            const formData = new FormData();
            formData.append("file", file);
            const image = await removeBackGroundAction(formData);
            imageToAnalyze = image;
            setAnalyzedImageUrl(imageToAnalyze);
          } else {
            setAnalyzedImageUrl(previewUrl);
          }
          const newAnalysisId = `analysis-${Date.now()}`;
          setAnalysisId(newAnalysisId);

          submit({ image: imageToAnalyze, options: analysisOptions });
        } catch (error) {
          console.error("Error processing image:", error);
          toast.error("An error occurred while processing the image");
        } finally {
          setIsLoading(false);
        }
      } else {
        toast.error("Please upload an image first");
      }
    },
    [
      previewUrl,
      file,
      analysisOptions,
      setIsLoading,
      setAnalysisId,
      setAnalyzedImageUrl,
    ],
  );

  return { handleAnalyze };
}
