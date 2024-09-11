import { useStyleStore } from "@/lib/store/useStyleStore";
import clsx from "clsx";
import { Edit2, Tag } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";

interface AnalysisHeaderProps {
  furniture: string;
  price?: string;
  textColor: string;
}

export const AnalysisHeader: React.FC<AnalysisHeaderProps> = ({
  furniture,
  price,
  textColor,
}) => {
  const [editablePrice, setEditablePrice] = useState(price || "");
  const [isFurnitureEditing, setIsFurnitureEditing] = useState(false);
  const [isPriceEditing, setIsPriceEditing] = useState(false);
  const furnitureRef = useRef<HTMLDivElement>(null);
  const { analysis, updateAnalysisField } = useStyleStore();

  useEffect(() => {
    if (furnitureRef.current) {
      furnitureRef.current.textContent = furniture;
    }
    setEditablePrice(price || "");
  }, [furniture, price]);

  const handleFurnitureChange = () => {
    const newValue = furnitureRef.current?.textContent || "";
    updateAnalysisField("furniture", newValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    updateAnalysisField("price", newValue);
  };

  return (
    <>
      <div className="relative group mb-4">
        <div className="flex items-center">
          <Tag className="mr-2" size={24} />
          <div
            ref={furnitureRef}
            className={clsx("text-2xl font-bold mr-2", {
              "border-blue-500": isFurnitureEditing || isPriceEditing,
              "border-transparent": !isFurnitureEditing && !isPriceEditing,
            })}
            style={{ color: textColor }}
            contentEditable
            suppressContentEditableWarning
            onInput={handleFurnitureChange}
            onFocus={() => setIsFurnitureEditing(true)}
            onBlur={() => setIsFurnitureEditing(false)}
          />
          <Edit2
            size={16}
            className={clsx(
              "edit-icon text-gray-400 transition-opacity duration-300",
              {
                "opacity-0": isFurnitureEditing,
                "opacity-100 group-hover:text-blue-500": !isFurnitureEditing,
              },
            )}
          />
        </div>
      </div>
      {analysis.price !== undefined && (
        <div className="flex items-center space-x-1.5">
          <label
            htmlFor="price"
            className="text-lg font-semibold whitespace-nowrap"
            style={{ color: textColor }}
          >
            Hinta:
          </label>
          <div className="relative flex items-center">
            <Input
              id="price"
              type="text"
              value={analysis.price}
              onChange={handlePriceChange}
              onFocus={() => setIsPriceEditing(true)}
              onBlur={() => setIsPriceEditing(false)}
              className={clsx(
                "bg-transparent outline-none text-xl font-semibold leading-none p-0 max-w-[150px] w-full",
                {
                  "border-blue-500": isPriceEditing,
                  "border-transparent": !isPriceEditing,
                },
              )}
              style={{
                color: textColor,
                transition: "border-color 0.3s ease",
              }}
            />
            <Edit2
              size={16}
              className={clsx(
                "edit-icon text-gray-400 transition-opacity duration-300 absolute right-2",
                {
                  "opacity-0": isPriceEditing,
                  "opacity-100 group-hover:text-blue-500": !isPriceEditing,
                },
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};
