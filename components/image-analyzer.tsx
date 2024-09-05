"use client";
import { experimental_useObject as useObject } from "ai/react";
import { FlexibleImageAnalysis, PartialImageAnalysis } from "@/lib/types";
import { AnalysisSection } from "./analysis-section";
import { AnalysisUrlSection } from "./analysis-url";
import { useUploadFileStore } from "@/lib/store/store";
import { removeBackGroundAction, saveAnalysisAction } from "@/lib/actions";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { getSchemaByPlatform } from "@/lib/utils";
import ShareButton from "./buttons/share-button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileUpload } from "./ui/file-upload";
import Image from "next/image";
import { AnalysisOptions } from "./analysis-options";
import { ArrowLeft, CheckCircle, Upload } from "lucide-react";
import { ReuploadButton } from "./buttons/reupload";
import { ComapreImages } from "./compare-imgs";

export function ImageAnalyzer() {
  const {
    previewUrl,
    analysisUrl,
    analysisId,
    analysisOptions,
    isLoading,
    file,
    setIsAnalysisComplete,
    setPreviewUrl,
    setAnalysisUrl,
    setAnalysisId,
    setIsLoading,
    setAnalyzedImageUrl,
    setFile,
  } = useUploadFileStore();

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
      console.log("error tuli", JSON.parse(error.message).error);
      toast.error(JSON.parse(error.message).error);
    },
  });

  const handleAnalyze = useCallback(async () => {
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

        await submit({ image: imageToAnalyze, options: analysisOptions });
      } catch (error) {
        console.error("Error processing image:", error);
        toast.error("An error occurred while processing the image");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please upload an image first");
    }
  }, [
    previewUrl,
    file,
    analysisOptions,
    setIsLoading,
    setAnalysisId,
    setAnalyzedImageUrl,
    submit,
  ]);

  const handleSaveAnalysis = async () => {
    if (object?.analysis && previewUrl) {
      try {
        const analysisToSave: FlexibleImageAnalysis = {
          ...object.analysis,
          imageUrl: previewUrl,
        };

        const result = await saveAnalysisAction(analysisToSave);
        setAnalysisUrl(result.analysisUrl);
        toast.success("Analyysi tallennettu onnistuneesti");
      } catch (error) {
        console.error("Virhe analyysin tallennuksessa:", error);
        toast.error("Analyysin tallennus epäonnistui");
      }
    } else {
      toast.error("Analyysiä ei ole vielä tehty");
    }
  };

  const handleGoBack = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div>
      {/* Lisää tämä teksti vaikka etusivulle */}
      {/* <h2 className="text-xl font-semibold">
                    Luo ammattimaisia myynti-ilmoituksia hetkessä
                  </h2>
                  <p className="text-muted-foreground">
                    Tämä sovellus on tehokas työkalu myynti-ilmoitusten
                    luomiseen tekoälyn avulla. Lataa kuva, ja anna tekoälyn
                    generoida houkutteleva ilmoitus automaattisesti.
                  </p> */}
      <Card className="container max-w-4xl">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Tekoälyllä tehostettu myynti-ilmoitusten luonti
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!object?.analysis ? (
            <>
              {!previewUrl ? (
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="md:w-2/3 space-y-4">
                    <ul className="space-y-2">
                      {[
                        "Automaattinen myynti-ilmoituksen generointi",
                        "Visuaalinen muokkausmahdollisuus",
                        "Helppo jakaminen sosiaalisessa mediassa",
                        "Tallennus myöhempää käyttöä varten",
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <ComapreImages />
                    </div>
                  </div>
                  <div className="md:w-1/3">
                    <FileUpload />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-6 justify-between items-start">
                  <div className="flex-1">
                    <div className="w-full aspect-square max-w-sm mx-auto relative">
                      <Image
                        src={previewUrl}
                        alt="Esikatselu"
                        fill
                        className="rounded-lg shadow-lg object-contain"
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
                      onClick={handleAnalyze}
                      className="w-full mt-4"
                      disabled={isLoading || isAiLoading}
                    >
                      {isLoading || isAiLoading
                        ? "Analysoidaan..."
                        : "Luo myynti-ilmoitus"}
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full">
              <AnalysisSection analysis={object.analysis} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
