import Link from "next/link";

interface AnalysisUrlSectionProps {
  analysisUrl: string;
}

export function AnalysisUrlSection({ analysisUrl }: AnalysisUrlSectionProps) {
  return (
    <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">
      <p>Analyysin URL:</p>
      <Link
        href={analysisUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        {analysisUrl}
      </Link>
    </div>
  );
}
