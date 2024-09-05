import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type FontSelectorProps = {
  value: string;
  onChange: (value: string) => void;
};

const fonts = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier",
  "Verdana",
  "Georgia",
  "Palatino",
  "Garamond",
  "Bookman",
  "Comic Sans MS",
  "Trebuchet MS",
  "Arial Black",
  "Impact",
];

export function FontSelector({ value, onChange }: FontSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="font-select">Valitse fontti</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="font-select">
          <SelectValue placeholder="Valitse fontti" />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font} value={font}>
              <span style={{ fontFamily: font }}>{font}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
