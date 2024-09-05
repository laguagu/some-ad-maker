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
                styleTheme: value as "modern" | "classic" | "scandinavian",
              })
            }
            className="flex flex-col space-y-1"
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

        <div>
          <Label htmlFor="platform" className="text-sm font-medium mb-2 block">
            Some Alusta
          </Label>
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
              <SelectItem value="general">
                <div className="flex items-center">
                  <IconWorld className="mr-2 h-4 w-4" />
                  Yleinen
                </div>
              </SelectItem>
              <SelectItem value="instagram">
                <div className="flex items-center">
                  <IconBrandInstagram className="mr-2 h-4 w-4" />
                  Instagram
                </div>
              </SelectItem>
              <SelectItem value="twitter">
                <div className="flex items-center">
                  <IconBrandTwitter className="mr-2 h-4 w-4" />
                  Twitter
                </div>
              </SelectItem>
              <SelectItem value="linkedin">
                <div className="flex items-center">
                  <IconBrandLinkedin className="mr-2 h-4 w-4" />
                  LinkedIn
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
