import { create } from "zustand";
import { AnalysisOptions } from "../types";

interface UploadFileState {
  isAnalysisComplete: boolean;
  file: File | null;
  previewUrl: string | null;
  analyzedImageUrl: string | null;
  analysisId: string | null;
  analysisUrl: string | null;
  analysisOptions: AnalysisOptions;
  currentView: "analysis" | "draggable" | "instagram";
  isLoading: boolean;
  showHashtags: boolean;
  contentRef: React.RefObject<HTMLDivElement> | null;
  storeAvatarUrl: string | null;
  hasAnimated: boolean;
  setIsAnalysisComplete: (value: boolean) => void;
  setFile: (file: File | null) => void;
  setPreviewUrl: (url: string | null) => void;
  setAnalysisId: (id: string | null) => void;
  setAnalysisUrl: (url: string | null) => void;
  setAnalyzedImageUrl: (url: string | null) => void;
  setAnalysisOptions: (options: AnalysisOptions) => void;
  setCurrentView: (view: "analysis" | "draggable" | "instagram") => void;
  setIsLoading: (value: boolean) => void;
  setContentRef: (ref: React.RefObject<HTMLDivElement>) => void;
  setShowHashtags: (show: boolean) => void;
  setStoreAvatarUrl: (url: string | null) => void;
  setHasAnimated: (value: boolean) => void;
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
    styleTheme: "",
    removeBackground: false,
    platform: "general",
  },
  currentView: "analysis",
  isLoading: false,
  platform: "general",
  contentRef: null,
  showHashtags: true,
  storeAvatarUrl: null,
  hasAnimated: false,
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
  setShowHashtags: (show) => set({ showHashtags: show }),
  setStoreAvatarUrl: (url) => set({ storeAvatarUrl: url }),

  setHasAnimated: (value) => set({ hasAnimated: value }),
}));
