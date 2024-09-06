import { Paintbrush, Type, Layout, Image as ImageIcon } from "lucide-react";
import { ColorPicker } from "../settings/colorpicker";
import { FontSelector } from "../settings/font-selector";
import { Slider } from "../ui/slider";
import { Checkbox } from "../ui/checkbox";
import { ViewSelector } from "../view-selector";
import { useUploadFileStore } from "@/lib/store/store";
import { useStyleStore } from "@/lib/store/useStyleStore";
import { Label } from "../ui/label";

export function NavItems() {
  const {
    setAnalysisOptions,
    analysisOptions,
    currentView,
    setCurrentView,
    showHashtags,
    setShowHashtags,
  } = useUploadFileStore();
  const {
    backgroundColor,
    textColor,
    fontSize,
    font,
    setBackgroundColor,
    setTextColor,
    setFontSize,
    setFont,
  } = useStyleStore();

  return [
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
      name: "Fontti",
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
        <div className="flex items-center justify-center space-x-2">
          <Checkbox
            id="includeColorScheme"
            checked={analysisOptions.includeColorScheme}
            onCheckedChange={(checked: boolean) =>
              setAnalysisOptions({
                ...analysisOptions,
                includeColorScheme: checked as boolean,
              })
            }
          />
          <Label htmlFor="includeColorScheme" className="cursor-pointer">
            Sisällytä värianalyysi
          </Label>
          <Checkbox
            id="showHashtags"
            checked={showHashtags}
            onCheckedChange={(checked: boolean) => setShowHashtags(checked)}
          />
          <Label htmlFor="showHashtags" className="cursor-pointer">
            Näytä hashtagit
          </Label>
        </div>
      ),
    },
  ];
}
