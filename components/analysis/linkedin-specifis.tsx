import React from "react";
import { Linkedin } from "lucide-react";

export const LinkedInSpecific = ({ analysis }: { analysis: any }) => (
  <>
    {analysis.professionalDescription && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
          <Linkedin className="mr-2" size={24} />
          Ammatillinen kuvaus:
        </h3>
        <p className="text-gray-700 dark:text-gray-200">
          {analysis.professionalDescription}
        </p>
      </div>
    )}
    {analysis.industryTags && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
          <Linkedin className="mr-2" size={24} />
          Toimialaavainsanat:
        </h3>
        <div className="flex flex-wrap gap-2">
          {analysis.industryTags.map((tag: string, index: number) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    )}
  </>
);
