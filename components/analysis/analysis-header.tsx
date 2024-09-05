import React from "react";
import { Tag } from "lucide-react";

interface AnalysisHeaderProps {
  furniture: string;
  price?: string;
  textColor: string;
}

export const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({
  furniture,
  price,
  textColor,
}) => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <h2
        className="text-2xl font-bold mb-4 flex items-center"
        style={{ color: textColor }}
      >
        <Tag className="mr-2" size={24} />
        {capitalizeFirstLetter(furniture)}
      </h2>
      {price && (
        <p
          className="text-xl font-semibold mb-4 flex items-center"
          style={{ color: textColor }}
        >
          Hinta: {price}
        </p>
      )}
    </>
  );
};
