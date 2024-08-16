import React from "react";

export function ImageAnalysis({ analysis }: { analysis: React.ReactNode }) {
  return (
    <div className="mt-4 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Image Analysis Result:</h2>
      {analysis}
    </div>
  );
}
