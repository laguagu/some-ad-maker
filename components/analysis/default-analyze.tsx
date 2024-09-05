"use client";
import { useUploadFileStore } from "@/lib/store/store";
import { useEffect, useRef, useState } from "react";
import { useStyleStore } from "@/lib/store/useStyleStore";
import {
  AnalysisImage,
  AnalysisHeader,
  AnalysisFeatures,
  AnalysisDescription,
  AnalysisColorScheme,
  AnalysisCallToAction,
  AnalysisHashtags,
  InstagramSpecific,
  TwitterSpecific,
  LinkedInSpecific,
  VisualDesign,
} from ".";

const DefaultAnalyze = ({
  analysis,
  imageUrl,
  showColorScheme,
}: {
  analysis: any;
  imageUrl: string;
  showColorScheme: boolean;
}) => {
  const { analysisOptions, setContentRef } = useUploadFileStore();
  const localContentRef = useRef<HTMLDivElement>(null);
  const platform = analysisOptions.platform;

  const { backgroundColor, textColor, font, fontSize } = useStyleStore();
  const [editableAnalysis, setEditableAnalysis] = useState(analysis);

  const handleFurnitureChange = (value: string) => {
    setEditableAnalysis((prev: any) => ({ ...prev, furniture: value }));
  };

  const handlePriceChange = (value: string) => {
    setEditableAnalysis((prev: any) => ({ ...prev, price: value }));
  };

  useEffect(() => {
    setContentRef(localContentRef);
  }, [setContentRef]);

  useEffect(() => {
    setEditableAnalysis(analysis);
  }, [analysis]);

  return (
    <div className="space-y-8">
      <div
        ref={localContentRef}
        className="p-6 border rounded-lg shadow-lg mx-auto"
        style={{
          backgroundColor: backgroundColor || "#FFFFFF",
          color: textColor,
          fontFamily: font,
          fontSize: `${fontSize}px`,
          width: "auto",
        }}
      >
        <AnalysisImage imageUrl={imageUrl} furniture={analysis.furniture} />
        <AnalysisHeader
          furniture={editableAnalysis.furniture}
          price={editableAnalysis.price}
          textColor={textColor}
          onFurnitureChange={handleFurnitureChange}
          onPriceChange={handlePriceChange}
        />
        <AnalysisFeatures
          features={analysis.keyFeatures}
          textColor={textColor}
        />
        <AnalysisDescription
          description={analysis.description}
          textColor={textColor}
        />
        {showColorScheme && analysis.colorScheme && (
          <AnalysisColorScheme
            colorScheme={analysis.colorScheme}
            textColor={textColor}
          />
        )}
        <AnalysisCallToAction
          callToAction={analysis.callToAction}
          textColor={textColor}
        />
        <AnalysisHashtags hashtags={analysis.hashtags} />

        {platform === "instagram" && <InstagramSpecific analysis={analysis} />}
        {platform === "twitter" && <TwitterSpecific analysis={analysis} />}
        {platform === "linkedin" && <LinkedInSpecific analysis={analysis} />}
      </div>

      {analysis.visualDesign && <VisualDesign design={analysis.visualDesign} />}
    </div>
  );
};

export default DefaultAnalyze;
