import { create } from "zustand";
import { AnalysisOptions } from "../types";
import { MutableRefObject } from "react";

interface UploadFileState {
  isAnalysisComplete: boolean;
  file: File | null;
  previewUrl: string | null;
  analyzedImageUrl: string | null;
  analysisId: string | null;
  analysisUrl: string | null;
  analysisOptions: AnalysisOptions;
  currentView: "analysis" | "draggable";
  isLoading: boolean;
  contentRef: MutableRefObject<HTMLDivElement | null> | null;
  setIsAnalysisComplete: (value: boolean) => void;
  setFile: (file: File | null) => void;
  setPreviewUrl: (url: string | null) => void;
  setAnalysisId: (id: string | null) => void;
  setAnalysisUrl: (url: string | null) => void;
  setAnalyzedImageUrl: (url: string | null) => void;
  setAnalysisOptions: (options: AnalysisOptions) => void;
  setCurrentView: (view: "analysis" | "draggable") => void;
  setIsLoading: (value: boolean) => void;
  setContentRef: (ref: MutableRefObject<HTMLDivElement | null>) => void;
}

export const useUploadFileStore = create<UploadFileState>((set) => ({
  isAnalysisComplete: false,
  file: null,
  previewUrl: null,
  analysisId: null,
  analysisUrl: null,
  analyzedImageUrl: null,
  analysisOptions: {
    includeColorScheme: true,
    styleTheme: "modern",
    removeBackground: false,
    platform: "general",
  },
  currentView: "analysis",
  isLoading: false,
  platform: "general",
  contentRef: null,
  setIsAnalysisComplete: (value) => set({ isAnalysisComplete: value }),
  setFile: (file) => set({ file }),
  setPreviewUrl: (url) => set({ previewUrl: url }),
  setAnalysisId: (id) => set({ analysisId: id }),
  setAnalysisUrl: (url) => set({ analysisUrl: url }),
  setAnalyzedImageUrl: (url) => set({ analyzedImageUrl: url }),
  setAnalysisOptions: (options) => set({ analysisOptions: options }),
  setCurrentView: (view) => set({ currentView: view }),
  setIsLoading: (value) => set({ isLoading: value }),
  setContentRef: (ref) => set({ contentRef: ref }),
}));
