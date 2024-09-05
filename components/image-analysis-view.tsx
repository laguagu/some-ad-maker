"use client";
import { useUploadFileStore } from "@/lib/store/store";
import { Eye, Info, Palette, ShoppingCart, Tag, Linkedin } from "lucide-react";
import { SiInstagram, SiGitter } from "react-icons/si";
import Image from "next/image";
import { useEffect, useRef } from "react";

const ImageAnalysisView = ({
  analysis,
  imageUrl,
  showColorScheme,
  backgroundColor,
  textColor,
  font,
  fontSize,
}: {
  analysis: any;
  imageUrl: string;
  showColorScheme: boolean;
  backgroundColor: string;
  textColor: string;
  font: string;
  fontSize: number;
}) => {
  const { analysisOptions, setContentRef } = useUploadFileStore();
  const localContentRef = useRef<HTMLDivElement>(null);
  const platform = analysisOptions.platform;

  useEffect(() => {
    setContentRef(localContentRef);
  }, [setContentRef]);

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="mt-8 space-y-8 pb-4 ">
      {/* Myynti-ilmoitus */}
      <div
        ref={localContentRef}
        className="p-6 border rounded-lg shadow-lg max-w-xl mx-auto"
        style={{
          backgroundColor: backgroundColor || "#FFFFFF",
          color: textColor,
          fontFamily: font,
          fontSize: `${fontSize}px`,
          maxWidth: "none", // Poistetaan max-width rajoitus
          width: "auto", // Annetaan elementin leveyden määräytyä sisällön mukaan
        }}
      >
        <div className="flex items-center justify-center mb-6 ">
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
        <h2
          className="text-2xl font-bold mb-4 flex items-center"
          style={{ color: textColor }}
        >
          <Tag className="mr-2" size={24} />
          {capitalizeFirstLetter(analysis.furniture)}
        </h2>
        {analysis.price && (
          <p
            className="text-xl font-semibold mb-4 flex items-center"
            style={{ color: textColor }}
          >
            Hinta: {analysis.price}
          </p>
        )}
        <div className="mb-4">
          <h3
            className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center"
            style={{ color: textColor }}
          >
            Tärkeimmät ominaisuudet:
          </h3>
          <ul className="list-none space-y-2">
            {analysis.keyFeatures && analysis.keyFeatures.length > 0 ? (
              analysis.keyFeatures.map((feature: string, index: number) => (
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
        <div className="mb-6">
          <h3
            className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center"
            style={{ color: textColor }}
          >
            <Info className="mr-2" size={24} />
            Kuvaus:
          </h3>
          <p className="text-gray-700 dark:text-gray-200">
            {analysis.description}
          </p>
        </div>
        {showColorScheme && analysis.colorScheme && (
          <div className="mb-6">
            <h3
              className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center"
              style={{ color: textColor }}
            >
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
          <p
            className="text-lg font-semibold  mb-4 flex items-center"
            style={{ color: textColor }}
          >
            <ShoppingCart className="mr-2" size={24} />
            {analysis.callToAction}
          </p>
        )}
        {analysis.hashtags && (
          <div className="flex flex-wrap gap-2 mt-4">
            {analysis.hashtags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Instagram-spesifiset kentät */}
        {platform === "instagram" && (
          <>
            {analysis.carouselImages && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
                  <SiInstagram className="mr-2" size={24} />
                  Karusellikusvat:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.carouselImages.map((url: string, index: number) => (
                    <Image
                      key={index}
                      src={url}
                      alt={`Karusellikuva ${index + 1}`}
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
            {analysis.storyIdea && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
                  <SiInstagram className="mr-2" size={24} />
                  Story-idea:
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  {analysis.storyIdea}
                </p>
              </div>
            )}
          </>
        )}

        {/* Twitter-spesifiset kentät */}
        {platform === "twitter" && (
          <>
            {analysis.shortDescription && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
                  <SiGitter className="mr-2" size={24} />
                  Lyhyt kuvaus:
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  {analysis.shortDescription}
                </p>
              </div>
            )}
            {analysis.relevantTrends && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
                  <SiGitter className="mr-2" size={24} />
                  Relevantit trendit:
                </h3>
                <ul className="list-disc pl-5">
                  {analysis.relevantTrends.map(
                    (trend: string, index: number) => (
                      <li
                        key={index}
                        className="text-gray-700 dark:text-gray-200"
                      >
                        {trend}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            )}
          </>
        )}

        {/* LinkedIn-spesifiset kentät */}
        {platform === "linkedin" && (
          <>
            {analysis.professionalDescription && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
                  <Linkedin className="mr-2" size={24} />
                  Ammatillinen kuvaus:
                </h3>
                <p className="text-gray-700 dark:text-gray-200">
                  {analysis.professionalDescription}
                </p>
              </div>
            )}
            {analysis.industryTags && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
                  <Linkedin className="mr-2" size={24} />
                  Toimialaavainsanat:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.industryTags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
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
