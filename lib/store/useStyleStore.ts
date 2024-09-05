import { create } from "zustand";

// Tyyleihin liittyvä Zustand Store
interface StyleState {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  font: string;
  setBackgroundColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setFontSize: (size: number) => void;
  setFont: (font: string) => void;
}

export const useStyleStore = create<StyleState>((set) => ({
  backgroundColor: "#FFFFFF",
  textColor: "#000000",
  fontSize: 16,
  font: "Arial",
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setTextColor: (color) => set({ textColor: color }),
  setFontSize: (size) => set({ fontSize: size }),
  setFont: (font) => set({ font }),
}));
