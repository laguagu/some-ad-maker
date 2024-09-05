import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Textarea } from "@/components/ui/textarea";
// DraggableItem component
interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}
export interface StyleProps extends React.CSSProperties {
  textColor?: string;
}

export function DraggableItem({
  id,
  children,
  isSelected,
  onClick,
}: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: isSelected ? "2px solid blue" : "",
    padding: "8px",
    margin: "4px",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="cursor-pointer"
    >
      {children}
    </div>
  );
}

// TitleComponent
interface TitleComponentProps {
  text: string;
  icon?: React.ReactNode;
  style?: StyleProps;
}

export const TitleComponent: React.FC<TitleComponentProps> = ({
  text,
  icon,
  style,
}) => {
  return (
    <h2
      className="text-2xl font-bold mb-2 flex items-center p-2 rounded"
      style={{
        ...style,
        color: style?.textColor || style?.color || "inherit",
        backgroundColor: style?.backgroundColor || "transparent",
      }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </h2>
  );
};
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
  style?: StyleProps;
}

export const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
  text,
  icon,
  style,
}) => {
  const [editableText, setEditableText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableText(e.target.value);
  };

  useEffect(() => {
    // Asettaa tekstialueen korkeuden sisällön mukaan
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editableText]);

  return (
    <div
      className="flex items-start p-2 rounded"
      style={{
        ...style,
        color: style?.textColor || style?.color || "inherit",
        backgroundColor: style?.backgroundColor || "transparent",
      }}
    >
      {icon && <span className="mr-2 mt-1">{icon}</span>}
      {isEditing ? (
        <Textarea
          ref={textareaRef}
          value={editableText}
          onChange={handleTextChange}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="w-full p-2 border border-gray-300 rounded resize-none overflow-hidden"
          rows={10} // Määrittää aloitusrivimäärän
        />
      ) : (
        <p onClick={() => setIsEditing(true)}>{editableText}</p>
      )}
    </div>
  );
};

interface PriceComponentProps {
  amount: string;
  icon?: React.ReactNode;
  style?: StyleProps;
}

export const PriceComponent: React.FC<PriceComponentProps> = ({
  amount,
  icon,
  style,
}) => (
  <div
    className="flex items-center p-2 rounded"
    style={{
      ...style,
      color: style?.textColor || style?.color || "inherit",
      backgroundColor: style?.backgroundColor || "transparent",
    }}
  >
    {icon && <span className="mr-2">{icon}</span>}
    <p>Hinta: {amount}</p>
  </div>
);

interface FeaturesComponentProps {
  features: string[];
  icon?: React.ReactNode;
  isHashtag?: boolean;
  style?: StyleProps;
}

export const FeaturesComponent: React.FC<FeaturesComponentProps> = ({
  features,
  icon,
  isHashtag,
  style,
}) => (
  <div
    className="p-2 rounded"
    style={{
      ...style,
      color: style?.textColor || style?.color || "inherit",
      backgroundColor: style?.backgroundColor || "transparent",
    }}
  >
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
