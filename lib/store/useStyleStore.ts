import { create } from "zustand";

// Tyyleihin liittyvä Zustand Store
interface StyleState {
  backgroundColor: string;
  textColor: string;
  fontSize: number;
  font: string;
  hasAnimated: boolean;
  currentLayout: "preview" | "analysis" | "initial";
  analysis: any;
  setBackgroundColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setFontSize: (size: number) => void;
  setFont: (font: string) => void;
  setHasAnimated: (value: boolean) => void;
  setCurrentLayout: (layout: "preview" | "analysis" | "initial") => void;
  setAnalysis: (analysis: any) => void;
  updateAnalysisField: (field: string, value: any) => void;
}

export const useStyleStore = create<StyleState>((set) => ({
  backgroundColor: "#FFFFFF",
  textColor: "#000000",
  fontSize: 16,
  font: "Arial",
  hasAnimated: false,
  currentLayout: "initial",
  analysis: {},
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setTextColor: (color) => set({ textColor: color }),
  setFontSize: (size) => set({ fontSize: size }),
  setFont: (font) => set({ font }),
  setHasAnimated: (value) => set({ hasAnimated: value }),
  setCurrentLayout: (layout) => set({ currentLayout: layout }),
  setAnalysis: (analysis) => set({ analysis }),
  updateAnalysisField: (field, value) =>
    set((state) => ({
      analysis: { ...state.analysis, [field]: value },
    })),
}));
