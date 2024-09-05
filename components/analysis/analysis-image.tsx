import React from "react";
import Image from "next/image";

export const AnalysisImage = ({
  imageUrl,
  furniture,
}: {
  imageUrl: string;
  furniture: string;
}) => (
  <div className="flex items-center justify-center mb-6">
    {imageUrl && (
      <div className="relative w-full aspect-square max-w-[300px]">
        <Image
          src={imageUrl}
          alt={furniture || "Kuva analysoidusta tuotteesta"}
          fill
          style={{ objectFit: "contain" }}
          sizes="(max-width: 300px) 100vw, 300px"
          className="rounded-lg"
        />
      </div>
    )}
  </div>
);
