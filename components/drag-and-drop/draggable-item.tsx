import React from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// DraggableItem component
interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
}

export function DraggableItem({ id, children }: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

// TitleComponent
interface TitleComponentProps {
  text: string;
  icon?: React.ReactNode;
}

export const TitleComponent: React.FC<TitleComponentProps> = ({
  text,
  icon,
}) => (
  <h2 className="text-2xl font-bold mb-2 flex items-center">
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </h2>
);

// ImageComponent
interface ImageComponentProps {
  src: string;
  alt: string;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ src, alt }) => (
  <div
    className="relative w-full max-w-md mx-auto mb-4"
    style={{ aspectRatio: "16/9" }}
  >
    <Image
      src={src}
      alt={alt}
      fill
      style={{ objectFit: "contain" }}
      sizes="(max-width: 768px) 100vw, 400px"
    />
  </div>
);

// DescriptionComponent
interface DescriptionComponentProps {
  text: string;
  icon?: React.ReactNode;
}

export const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  text,
  icon,
}) => (
  <div className="flex items-start">
    {icon && <span className="mr-2 mt-1">{icon}</span>}
    <p className="text-base">{text}</p>
  </div>
);

interface PriceComponentProps {
  amount: string;
  icon?: React.ReactNode;
}

export const PriceComponent: React.FC<PriceComponentProps> = ({
  amount,
  icon,
}) => (
  <p className="text-xl font-semibold flex items-center">
    {icon && <span className="mr-2">{icon}</span>}
    Hinta: {amount}
  </p>
);

interface FeaturesComponentProps {
  features: string[];
  icon?: React.ReactNode;
  isHashtag?: boolean;
}

export const FeaturesComponent: React.FC<FeaturesComponentProps> = ({
  features,
  icon,
  isHashtag,
}) => (
  <div>
    <h3 className="text-lg font-semibold mb-2 flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      {isHashtag ? "Hashtagit:" : "Ominaisuudet:"}
    </h3>
    <ul className="list-disc pl-5">
      {features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
  </div>
);
