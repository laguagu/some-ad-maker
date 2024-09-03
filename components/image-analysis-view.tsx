import { Eye, Info, Palette, ShoppingCart, Tag } from "lucide-react";
import Image from "next/image";

const ImageAnalysisView = ({
  analysis,
  imageUrl,
  showColorScheme,
}: {
  analysis: any;
  imageUrl: string;
  showColorScheme: boolean;
}) => {
  const capitalizeFirstLetter = (string: string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div className="mt-8 space-y-8">
      {/* Myynti-ilmoitus */}
      <div className="p-6 bg-custom-bg dark:bg-gray-800 border rounded-lg shadow-lg max-w-xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          {imageUrl && (
            <div className="relative w-full aspect-square max-w-[300px]">
              <Image
                src={imageUrl}
                alt={analysis.furniture || "Kuva analysoidusta tuotteesta"}
                fill
                style={{ objectFit: "contain" }}
                sizes="(max-width: 300px) 100vw, 300px"
                className="rounded-lg"
              />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
          <Tag className="mr-2" size={24} />
          {capitalizeFirstLetter(analysis.furniture)}
        </h2>
        {analysis.price && (
          <p className="text-xl font-semibold text-green-600 dark:text-green-400 mb-4 flex items-center">
            Hinta: {analysis.price}
          </p>
        )}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
            Tärkeimmät ominaisuudet:
          </h3>
          <ul className="list-none space-y-2">
            {analysis.keyFeatures && analysis.keyFeatures.length > 0 ? (
              analysis.keyFeatures.map((feature: string, index: number) => (
                <li
                  key={index}
                  className="text-gray-700 dark:text-gray-200 flex items-center"
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
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
            <Info className="mr-2" size={24} />
            Kuvaus:
          </h3>
          <p className="text-gray-700 dark:text-gray-200">
            {analysis.description}
          </p>
        </div>
        {showColorScheme && analysis.colorScheme && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
              <Palette className="mr-2" size={24} />
              Värimaailma:
            </h3>
            <div className="flex items-center space-x-2">
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: analysis.colorScheme.primary }}
                title="Pääväri"
              ></div>
              {analysis.colorScheme.secondary && (
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: analysis.colorScheme.secondary }}
                  title="Toissijainen väri"
                ></div>
              )}
              {analysis.colorScheme.accent && (
                <div
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: analysis.colorScheme.accent }}
                  title="Korostusväri"
                ></div>
              )}
            </div>
          </div>
        )}
        {analysis.callToAction && (
          <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-4 flex items-center">
            <ShoppingCart className="mr-2" size={24} />
            {analysis.callToAction}
          </p>
        )}
        <div className="flex flex-wrap gap-2 mt-4">
          {analysis.hashtags &&
            analysis.hashtags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
        </div>
      </div>

      {/* Visuaalinen ilme-ehdotus */}
      {analysis.visualDesign && (
        <div className="p-6 bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-w-xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
            <Eye className="mr-2" size={24} />
            Visuaalinen ilme-ehdotus:
          </h3>
          <p className="text-gray-700 dark:text-gray-200">
            {analysis.visualDesign}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageAnalysisView;
