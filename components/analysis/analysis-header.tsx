import React, { useState, useEffect, useRef, use } from "react";
import { Tag, Edit2 } from "lucide-react";

interface AnalysisHeaderProps {
  furniture: string;
  price?: string;
  textColor: string;
  onFurnitureChange?: (value: string) => void;
  onPriceChange?: (value: string) => void;
}

export const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({
  furniture,
  price,
  textColor,
  onFurnitureChange,
  onPriceChange,
}) => {
  const [editablePrice, setEditablePrice] = useState(price || "");
  const [isFurnitureEditing, setIsFurnitureEditing] = useState(false);
  const [isPriceEditing, setIsPriceEditing] = useState(false);
  const furnitureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (furnitureRef.current) {
      furnitureRef.current.textContent = furniture;
    }
    setEditablePrice(price || "");
  }, [furniture, price]);

  const handleFurnitureChange = () => {
    const newValue = furnitureRef.current?.textContent || "";
    onFurnitureChange?.(newValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setEditablePrice(newValue);
    onPriceChange?.(newValue);
  };

  return (
    <>
      <div className="relative group mb-4">
        <div className="flex items-center">
          <Tag className="mr-2" size={24} />
          <div
            ref={furnitureRef}
            className="text-2xl font-bold outline-none mr-2"
            style={{ color: textColor }}
            contentEditable
            suppressContentEditableWarning
            onInput={handleFurnitureChange}
            onFocus={() => setIsFurnitureEditing(true)}
            onBlur={() => setIsFurnitureEditing(false)}
          />
          <Edit2
            size={16}
            className={`edit-icon text-gray-400 transition-opacity duration-300 ${
              isFurnitureEditing
                ? "opacity-0"
                : "opacity-100 group-hover:text-blue-500"
            }`}
          />
        </div>
      </div>
      {editablePrice !== undefined && (
        <div
          className="text-xl font-semibold mb-4 flex items-center relative group"
          style={{ color: textColor }}
        >
          <span className="mr-2  flex-shrink-0">Hinta:</span>
          <div className="relative flex items-center">
            <input
              type="text"
              value={editablePrice}
              onChange={handlePriceChange}
              onFocus={() => setIsPriceEditing(true)}
              onBlur={() => setIsPriceEditing(false)}
              className={`bg-transparent outline-none text-xl font-semibold leading-none p-0 mt-1 ${
                isPriceEditing
                  ? "border-b-2 border-blue-500"
                  : "border-b-2 border-transparent"
              }`}
              style={{
                color: textColor,
                width: `${editablePrice.length + 2}ch`,
                transition: "border-color 0.3s ease",
                lineHeight: "1.15", // Tämä auttaa kohdistamaan tekstin vertikaalisesti
              }}
            />
            <Edit2
              size={16}
              className={`edit-icon ml-2 text-gray-400 transition-opacity duration-300 flex-shrink-0 ${
                isPriceEditing
                  ? "opacity-0"
                  : "opacity-100 group-hover:text-blue-500"
              }`}
            />
          </div>
        </div>
      )}
    </>
  );
};
