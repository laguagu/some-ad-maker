import { create } from "zustand";

// Tyyleihin liittyvä Zustand Store
interface StyleState {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  font: string;
  hasAnimated: boolean;
  setBackgroundColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setFontSize: (size: number) => void;
  setFont: (font: string) => void;
  setHasAnimated: (value: boolean) => void;
}

export const useStyleStore = create<StyleState>((set) => ({
  backgroundColor: "#FFFFFF",
  textColor: "#000000",
  fontSize: 16,
  font: "Arial",
  hasAnimated: false,
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setTextColor: (color) => set({ textColor: color }),
  setFontSize: (size) => set({ fontSize: size }),
  setFont: (font) => set({ font }),
  setHasAnimated: (value) => set({ hasAnimated: value }),
}));
