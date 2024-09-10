import { ImageAnalyzer } from "@/components/image-analyzer";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="min-h-screen w-full flex justify-center items-center relative">
      <div className="absolute inset-0 dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
        <div className="absolute pointer-events-none inset-0 dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <Suspense
          fallback={
            <div className="text-center text-xl font-semibold">
              Mainosmestari tulossa . . .
            </div>
          }
        >
          <ImageAnalyzer />
        </Suspense>
      </div>
    </main>
  );
}
