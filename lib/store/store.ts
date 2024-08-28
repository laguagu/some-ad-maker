import { create } from "zustand";
import { AnalysisOptions } from "@/components/analysis-options";

interface UploadFileState {
  isAnalysisComplete: boolean;
  files: File[];
  previewUrl: string | null;
  analysisId: string | null;
  analysisUrl: string | null;
  analysisOptions: AnalysisOptions;
  currentView: "analysis" | "draggable";
  isLoading: boolean;
  setIsAnalysisComplete: (value: boolean) => void;
  setFiles: (files: File[]) => void;
  setPreviewUrl: (url: string | null) => void;
  setAnalysisId: (id: string | null) => void;
  setAnalysisUrl: (url: string | null) => void;
  setAnalysisOptions: (options: AnalysisOptions) => void;
  setCurrentView: (view: "analysis" | "draggable") => void;
  setIsLoading: (value: boolean) => void;
}

export const useUploadFileStore = create<UploadFileState>((set) => ({
  isAnalysisComplete: false,
  files: [],
  previewUrl: null,
  analysisId: null,
  analysisUrl: null,
  analysisOptions: { includeColorScheme: true, styleTheme: "modern" },
  currentView: "analysis",
  isLoading: false,
  setIsAnalysisComplete: (value) => set({ isAnalysisComplete: value }),
  setFiles: (files) => set({ files }),
  setPreviewUrl: (url) => set({ previewUrl: url }),
  setAnalysisId: (id) => set({ analysisId: id }),
  setAnalysisUrl: (url) => set({ analysisUrl: url }),
  setAnalysisOptions: (options) => set({ analysisOptions: options }),
  setCurrentView: (view) => set({ currentView: view }),
  setIsLoading: (value) => set({ isLoading: value }),
}));
