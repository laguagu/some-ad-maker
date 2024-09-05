import React from "react";

export const AnalysisFeatures = ({
  features,
  textColor,
}: {
  features: string[];
  textColor: string;
}) => (
  <div className="mb-4">
    <h3
      className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center"
      style={{ color: textColor }}
    >
      Tärkeimmät ominaisuudet:
    </h3>
    <ul className="list-none space-y-2">
      {features && features.length > 0 ? (
        features.map((feature, index) => (
          <li
            key={index}
            className="text-gray-700 dark:text-gray-200 flex items-center"
            style={{ color: textColor }}
          >
            <div className="mr-2 text-blue-500">•</div>
            {feature}
          </li>
        ))
      ) : (
        <li className="text-gray-700 dark:text-gray-200">
          Ei ominaisuuksia saatavilla
        </li>
      )}
    </ul>
  </div>
);
