import React, { useState } from "react";
import { StreamedAnalysis } from "@/lib/types";
import { ViewRenderer } from "./view-render";
import { ViewSelector } from "./view-selector";
import { useUploadFileStore } from "@/lib/store/store";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { FloatingNav } from "./floating-nav";
import { ColorPicker } from "./settings/colorpicker"; // Custom component
import { FontSelector } from "./settings/font-selector"; // Custom component
import { Slider } from "./ui/slider"; // shadcn component
import { Card } from "./ui/card"; // shadcn component
import { Paintbrush, Type, Layout, Image as ImageIcon } from "lucide-react";

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
    setFile,
    setPreviewUrl,
    setAnalyzedImageUrl,
    setIsAnalysisComplete,
    setAnalysisUrl,
    setAnalysisId,
  } = useUploadFileStore();

  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(16);
  const [font, setFont] = useState("Arial");

  const handleReupload = () => {
    setFile(null);
    setPreviewUrl(null);
    setAnalyzedImageUrl(null);
    setIsAnalysisComplete(false);
    setAnalysisUrl(null);
    setAnalysisId(null);
  };

  const navItems = [
    {
      name: "Värit",
      icon: <Paintbrush className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <ColorPicker
            label="Taustaväri"
            color={backgroundColor}
            onChange={setBackgroundColor}
          />
          <ColorPicker
            label="Tekstin väri"
            color={textColor}
            onChange={setTextColor}
          />
        </div>
      ),
    },
    {
      name: "Typografia",
      icon: <Type className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <FontSelector value={font} onChange={setFont} />
          <Label>Fonttikoko</Label>
          <Slider
            min={12}
            max={24}
            step={1}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
          />
        </div>
      ),
    },
    {
      name: "Asettelu",
      icon: <Layout className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
          <ViewSelector
            currentView={currentView}
            onViewChange={setCurrentView}
          />
        </div>
      ),
    },
    {
      name: "Kuva",
      icon: <ImageIcon className="h-4 w-4" />,
      content: (
        <div className="space-y-4">
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
          <Label htmlFor="includeColorScheme">Sisällytä värianalyysi</Label>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4 sm:mt-8 relative">
      <h3 className="text-lg sm:text-xl font-bold mb-4 text-center">
        Myynti-ilmoitus
      </h3>
      <Card>
        <ViewRenderer
          currentView={currentView}
          analysis={analysis}
          imageUrl={analyzedImageUrl || ""}
          showColorScheme={analysisOptions.includeColorScheme}
          backgroundColor={backgroundColor}
          textColor={textColor}
          font={font}
          fontSize={fontSize}
        />
      </Card>
      <FloatingNav navItems={navItems} onReupload={handleReupload} />
    </div>
  );
}
