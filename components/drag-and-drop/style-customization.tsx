import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';

export interface StyleProps {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
}

interface StyleCustomizationProps {
  onStyleChange: (styles: Partial<StyleProps>) => void;
}

export function StyleCustomization({ onStyleChange }: StyleCustomizationProps) {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(16);

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundColor(color);
    onStyleChange({ backgroundColor: color });
  };

  const handleTextColorChange = (color: string) => {
    setTextColor(color);
    onStyleChange({ textColor: color });
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value);
    setFontSize(newSize);
    onStyleChange({ fontSize: newSize });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Taustaväri:
        </label>
        <HexColorPicker color={backgroundColor} onChange={handleBackgroundColorChange} />
        <div className="mt-2 text-sm text-gray-500">{backgroundColor}</div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Tekstin väri:
        </label>
        <HexColorPicker color={textColor} onChange={handleTextColorChange} />
        <div className="mt-2 text-sm text-gray-500">{textColor}</div>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Fonttikoko:
        </label>
        <input 
          type="range" 
          min="12" 
          max="24" 
          value={fontSize} 
          onChange={handleFontSizeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" 
        />
        <span className="ml-2 text-sm text-gray-500">{fontSize}px</span>
      </div>
    </div>
  );
}