import React from "react";
import { Palette } from "lucide-react";

export const AnalysisColorScheme = ({
  colorScheme,
  textColor,
}: {
  colorScheme: any;
  textColor: string;
}) => (
  <div className="mb-6">
    <h3
      className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center"
      style={{ color: textColor }}
    >
      <Palette className="mr-2" size={24} />
      Värimaailma:
    </h3>
    <div className="flex items-center space-x-2">
      <div
        className="w-6 h-6 rounded-full"
        style={{ backgroundColor: colorScheme.primary }}
        title="Pääväri"
      ></div>
      {colorScheme.secondary && (
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: colorScheme.secondary }}
          title="Toissijainen väri"
        ></div>
      )}
      {colorScheme.accent && (
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: colorScheme.accent }}
          title="Korostusväri"
        ></div>
      )}
    </div>
  </div>
);
