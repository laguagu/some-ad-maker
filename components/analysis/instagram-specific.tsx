import React from "react";
import Image from "next/image";
import { SiInstagram } from "react-icons/si";

export const InstagramSpecific = ({ analysis }: { analysis: any }) => (
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
        <p className="text-gray-700 dark:text-gray-200">{analysis.storyIdea}</p>
      </div>
    )}
  </>
);
