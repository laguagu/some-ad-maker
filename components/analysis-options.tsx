import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type AnalysisOptions = {
  includeColorScheme: boolean;
  styleTheme: "modern" | "classic" | "scandinavian";
};

type AnalysisOptionsProps = {
  options: AnalysisOptions;
  onChange: (options: AnalysisOptions) => void;
};

export function AnalysisOptions({ options, onChange }: AnalysisOptionsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="includeColorScheme"
          checked={options.includeColorScheme}
          onCheckedChange={(checked) =>
            onChange({ ...options, includeColorScheme: checked as boolean })
          }
        />
        <Label htmlFor="includeColorScheme">Sisällytä värianalyysi</Label>
      </div>

      <div>
        <Label>Tyylisuunta</Label>
        <RadioGroup
          value={options.styleTheme}
          onValueChange={(value) =>
            onChange({
              ...options,
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
    </div>
  );
}
