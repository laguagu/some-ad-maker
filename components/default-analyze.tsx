"use client";
import { useUploadFileStore } from "@/lib/store/store";
import { useEffect, useRef } from "react";
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
} from "./analysis";

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

  useEffect(() => {
    setContentRef(localContentRef);
  }, [setContentRef]);

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
          furniture={analysis.furniture}
          price={analysis.price}
          textColor={textColor}
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
