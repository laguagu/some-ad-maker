import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUploadFileStore } from "@/lib/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandLinkedin,
  IconWorld,
} from "@tabler/icons-react";
import { Castle, Globe, Lightbulb, Sparkles, Trees } from "lucide-react";

export function AnalysisOptions() {
  const { analysisOptions, setAnalysisOptions } = useUploadFileStore();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Asetukset</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium mb-2 block">
            Haluttu tyylisuunta
          </Label>
          <RadioGroup
            value={analysisOptions.styleTheme}
            onValueChange={(value) =>
              setAnalysisOptions({
                ...analysisOptions,
                styleTheme: value as "modern" | "classic" | "scandinavian" | "",
              })
            }
            className="flex flex-col space-y-1"
          >
            {[
              {
                value: "",
                label: "Yleinen",
                icon: <Globe className="h-4 w-4 mr-2" />,
              },
              {
                value: "modern",
                label: "Moderni",
                icon: <Lightbulb className="h-4 w-4 mr-2" />,
              },
              {
                value: "classic",
                label: "Klassinen",
                icon: <Castle className="h-4 w-4 mr-2" />,
              },
              {
                value: "scandinavian",
                label: "Skandinaavinen",
                icon: <Trees className="h-4 w-4 mr-2" />,
              },
            ].map((item) => (
              <div key={item.value} className="flex items-center space-x-2">
                <RadioGroupItem value={item.value} id={item.value} />
                <Label
                  htmlFor={item.value}
                  className="text-sm flex items-center"
                >
                  {item.icon}
                  {item.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

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
            Poista kuvan tausta
          </Label>
        </div>

        <Separator />

        <div className="space-y-3">
          <div>
            <Label htmlFor="platform" className="text-sm font-medium">
              Julkaisualusta
            </Label>
            <p className="text-sm text-muted-foreground">
              Valitse alusta, jolle myynti-ilmoitus optimoidaan
            </p>
          </div>
          <Select
            value={analysisOptions.platform}
            onValueChange={(value) =>
              setAnalysisOptions({
                ...analysisOptions,
                platform: value as
                  | "general"
                  | "instagram"
                  | "twitter"
                  | "linkedin",
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Valitse alusta" />
            </SelectTrigger>
            <SelectContent>
              {[
                { value: "general", label: "Yleinen", icon: IconWorld },
                {
                  value: "instagram",
                  label: "Instagram",
                  icon: IconBrandInstagram,
                },
                { value: "twitter", label: "Twitter", icon: IconBrandTwitter },
                {
                  value: "linkedin",
                  label: "LinkedIn",
                  icon: IconBrandLinkedin,
                },
              ].map((platform) => (
                <SelectItem key={platform.value} value={platform.value}>
                  <div className="flex items-center">
                    <platform.icon className="mr-2 h-4 w-4" />
                    {platform.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
