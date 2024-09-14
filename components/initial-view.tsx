import { useStyleStore } from "@/lib/store/useStyleStore";
import gsap from "gsap";
import { Heart, Info, MessageCircle } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { AnimateText } from "./animation/gsap";
import { Scene } from "./animation/instagram-post";
import NumberTicker from "./magicui/number-ticker";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileUpload } from "./ui/file-upload";

export function InitialView() {
  const uploadCardRef = useRef<HTMLDivElement>(null);
  const uploadTitleRef = useRef<HTMLHeadingElement>(null);
  const uploadContentRef = useRef<HTMLDivElement>(null);

  const { hasAnimated, setHasAnimated } = useStyleStore();

  useLayoutEffect(() => {
    if (!hasAnimated) {
      const ctx = gsap.context(() => {
        if (
          uploadCardRef.current &&
          uploadTitleRef.current &&
          uploadContentRef.current
        ) {
          gsap.set(
            [
              uploadCardRef.current,
              uploadTitleRef.current,
              uploadContentRef.current.children,
            ],
            { opacity: 0, y: 20 },
          );

          gsap
            .timeline({
              defaults: { duration: 0.6, ease: "power2.out" },
              delay: 0.2,
            })
            .to(uploadCardRef.current, { opacity: 1, y: 0 })
            .to(uploadTitleRef.current, { opacity: 1, y: 0 }, "-=0.4")
            .to(
              Array.from(uploadContentRef.current.children),
              { opacity: 1, y: 0, stagger: 0.1 },
              "-=0.4",
            );
        }
      });

      setHasAnimated(true);
      return () => ctx.revert();
    }
  }, [hasAnimated, setHasAnimated]);

  return (
    <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-8">
      <div className="w-full lg:w-2/3 space-y-4 flex flex-col">
        <Card className="w-full flex-grow">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">Ominaisuudet</CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <AnimateText />
          </CardContent>
        </Card>
        <Card className="w-full flex-grow overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl flex justify-between items-center bg-slate-200 py-2 rounded-full px-4 border-2">
              <span>Esimerkki julkaisu</span>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Heart className="w-5 h-5 text-red-500  mr-2" />
                  <NumberTicker value={425} className="text-lg font-bold" />
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-5 h-5 text-blue-500 mr-2" />
                  <NumberTicker value={44} className="text-lg font-bold" />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-[250px] lg:h-[350px]">
            <Scene />
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col">
        <Card ref={uploadCardRef} className="w-full flex-grow">
          <CardHeader>
            <CardTitle ref={uploadTitleRef} className="text-lg lg:text-xl">
              Aloita tästä
            </CardTitle>
          </CardHeader>
          <CardContent ref={uploadContentRef}>
            <p className="text-xs lg:text-sm text-gray-600 mb-4">
              Lataa kuva tuotteestasi ja anna Mainosmestarin luoda sinulle
              ammattimainen myynti-ilmoitus.
            </p>
            <div className="border-2  rounded-2xl">
              {" "}
              <FileUpload />
            </div>
            <div className="mt-4 text-xs lg:text-sm text-gray-500 flex items-start">
              <Info className="h-4 w-4 lg:h-5 lg:w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>
                Hyväksymme JPG, PNG ja WebP -kuvaformaatit. Parhaan tuloksen
                saat kuvalla, jossa tuote näkyy selkeästi.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
