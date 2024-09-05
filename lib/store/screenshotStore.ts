import { create } from "zustand";

interface ScreenshotState {
  isCapturingScreenshot: boolean;
  setIsCapturingScreenshot: (isCapturing: boolean) => void;
}

export const useScreenshotStore = create<ScreenshotState>((set) => ({
  isCapturingScreenshot: false,
  setIsCapturingScreenshot: (isCapturing) =>
    set({ isCapturingScreenshot: isCapturing }),
}));
