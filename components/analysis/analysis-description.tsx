import React from "react";
import { Info } from "lucide-react";

export const AnalysisDescription = ({
  description,
  textColor,
}: {
  description: string;
  textColor: string;
}) => (
  <div className="mb-6">
    <h3
      className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center"
      style={{ color: textColor }}
    >
      <Info className="mr-2" size={24} />
      Kuvaus:
    </h3>
    <p className="text-gray-700 dark:text-gray-200">{description}</p>
  </div>
);
