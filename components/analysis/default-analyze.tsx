"use client";
import { useUploadFileStore } from "@/lib/store/store";
import { useStyleStore } from "@/lib/store/useStyleStore";
import { useEffect, useRef } from "react";
import {
  AnalysisCallToAction,
  AnalysisColorScheme,
  AnalysisDescription,
  AnalysisFeatures,
  AnalysisHashtags,
  AnalysisHeader,
  AnalysisImage,
  InstagramSpecific,
  LinkedInSpecific,
  TwitterSpecific,
  VisualDesign,
} from ".";
import { Card } from "../ui/card";

const DefaultAnalyze = ({
  analysis,
  imageUrl,
  showColorScheme,
}: {
  analysis: any;
  imageUrl: string;
  showColorScheme: boolean;
}) => {
  console.log("analysis", analysis);

  const { showHashtags, analysisOptions, setContentRef } = useUploadFileStore();
  const localContentRef = useRef<HTMLDivElement>(null);
  const platform = analysisOptions.platform;

  const {
    backgroundColor,
    textColor,
    font,
    fontSize,
    setAnalysis,
    analysis: editableAnalysis,
  } = useStyleStore();

  useEffect(() => {
    setContentRef(localContentRef);
  }, [setContentRef]);

  useEffect(() => {
    setAnalysis(analysis);
  }, [analysis, setAnalysis]);

  return (
    <div className="space-y-8 max-w-[600px] mx-auto mb-10">
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
        {showHashtags && (
          <AnalysisHashtags hashtags={analysis.hashtags || []} />
        )}
      </div>
      {platform !== "general" && (
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
            Alusta kohtainen sisältö ehdotus:
          </h2>
          {platform === "twitter" && <TwitterSpecific analysis={analysis} />}
          {platform === "linkedin" && <LinkedInSpecific analysis={analysis} />}
          {platform === "instagram" && (
            <InstagramSpecific analysis={analysis} />
          )}
        </Card>
      )}
      {analysis.visualDesign && <VisualDesign design={analysis.visualDesign} />}
    </div>
  );
};

export default DefaultAnalyze;
