import { PartialImageAnalysis, StreamedAnalysis } from "@/lib/types";
import { Button } from "./ui/button";
import { ViewRenderer } from "./view-render";
import { ViewSelector } from "./view-selector";
import { useUploadFileStore } from "@/lib/store/store";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

type AnalysisSectionProps = {
  analysis: StreamedAnalysis;
};

export function AnalysisSection({ analysis }: AnalysisSectionProps) {
  const {
    setAnalysisOptions,
    analyzedImageUrl,
    analysisOptions,
    currentView,
    setCurrentView,
  } = useUploadFileStore();

  return (
    <div className="mt-4 sm:mt-8">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">
        Myynti-ilmoitus
      </h3>
      <ViewSelector currentView={currentView} onViewChange={setCurrentView} />
      <div className="flex items-center space-x-2 justify-center my-4">
        <Checkbox
          id="includeColorScheme"
          checked={analysisOptions.includeColorScheme}
          onCheckedChange={(checked) =>
            setAnalysisOptions({
              ...analysisOptions,
              includeColorScheme: checked as boolean,
            })
          }
        />
        <Label htmlFor="includeColorScheme" className="text-sm sm:text-base">
          Sisällytä värianalyysi
        </Label>
      </div>
      <ViewRenderer
        currentView={currentView}
        analysis={analysis}
        imageUrl={analyzedImageUrl || ""}
        showColorScheme={analysisOptions.includeColorScheme}
      />
    </div>
  );
}
