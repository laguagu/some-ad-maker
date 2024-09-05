import React from "react";
import { SiGitter } from "react-icons/si";

export const TwitterSpecific = ({ analysis }: { analysis: any }) => (
  <>
    {analysis.shortDescription && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
          <SiGitter className="mr-2" size={24} />
          Lyhyt kuvaus:
        </h3>
        <p className="text-gray-700 dark:text-gray-200">
          {analysis.shortDescription}
        </p>
      </div>
    )}
    {analysis.relevantTrends && (
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
          <SiGitter className="mr-2" size={24} />
          Relevantit trendit:
        </h3>
        <ul className="list-disc pl-5">
          {analysis.relevantTrends.map((trend: string, index: number) => (
            <li key={index} className="text-gray-700 dark:text-gray-200">
              {trend}
            </li>
          ))}
        </ul>
      </div>
    )}
  </>
);
