import React from "react";

type ColorPickerProps = {
  label: string;
  color: string;
  onChange: (color: string) => void;
};

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  color,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor={`color-${label}`} className="text-sm font-medium">
        {label}
      </label>
      <input
        type="color"
        id={`color-${label}`}
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
      />
      <span className="text-sm">{color}</span>
    </div>
  );
};
