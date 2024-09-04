import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUploadFileStore } from "@/lib/store/store";

export function AnalysisOptions() {
  const { analysisOptions, setAnalysisOptions } = useUploadFileStore();

  return (
    <div className="space-y-3">
      <div>
        <Label className="text-sm font-medium mb-1 block">Tyylisuunta</Label>
        <RadioGroup
          value={analysisOptions.styleTheme}
          onValueChange={(value) =>
            setAnalysisOptions({
              ...analysisOptions,
              styleTheme: value as "modern" | "classic" | "scandinavian",
            })
          }
          className="space-y-1"
        >
          {[
            { value: "modern", label: "Moderni" },
            { value: "classic", label: "Klassinen" },
            { value: "scandinavian", label: "Skandinaavinen" },
          ].map((item) => (
            <div key={item.value} className="flex items-center space-x-2">
              <RadioGroupItem value={item.value} id={item.value} />
              <Label htmlFor={item.value} className="text-sm">
                {item.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="removeBackground"
          checked={analysisOptions.removeBackground}
          onCheckedChange={(checked) => {
            setAnalysisOptions({
              ...analysisOptions,
              removeBackground: checked as boolean,
            });
          }}
        />
        <Label htmlFor="removeBackground" className="text-sm">
          Poista tausta
        </Label>
      </div>
    </div>
  );
}
