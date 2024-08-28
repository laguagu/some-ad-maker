import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUploadFileStore } from "@/lib/store/store";

export type AnalysisOptions = {
  includeColorScheme: boolean;
  styleTheme: "modern" | "classic" | "scandinavian";
};

export function AnalysisOptions() {
  const { analysisOptions, setAnalysisOptions } = useUploadFileStore();

  return (
    <div className="space-y-4">
      <div>
        <Label>Tyylisuunta</Label>
        <RadioGroup
          value={analysisOptions.styleTheme}
          onValueChange={(value) =>
            setAnalysisOptions({
              ...analysisOptions,
              styleTheme: value as "modern" | "classic" | "scandinavian",
            })
          }
        >
          <div className="flex items-center space-x-2 space-y-2">
            <RadioGroupItem value="modern" id="modern" />
            <Label htmlFor="modern">Moderni</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="classic" id="classic" />
            <Label htmlFor="classic">Klassinen</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="scandinavian" id="scandinavian" />
            <Label htmlFor="scandinavian">Skandinaavinen</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="flex items-center space-x-2 justify-center">
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
        <Label htmlFor="includeColorScheme">Poista kuvan tausta</Label>
      </div>
    </div>
  );
}
