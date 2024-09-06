import React from "react";

export const AnalysisHashtags = ({ hashtags }: { hashtags?: string[] }) => (
  <div className="flex flex-wrap gap-2 mt-4">
    {hashtags && hashtags.length > 0 ? (
      hashtags.map((tag, index) => (
        <span
          key={index}
          className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-sm"
        >
          {tag}
        </span>
      ))
    ) : (
      <span className="text-gray-500">Ei hashtageja saatavilla</span>
    )}
  </div>
);