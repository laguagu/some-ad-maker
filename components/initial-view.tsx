import { useUploadFileStore } from "@/lib/store/store";
import gsap from "gsap";
import { Info } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { AnimateText } from "./animation/gsap";
import { Scene } from "./animation/instagram-post";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FileUpload } from "./ui/file-upload";

export function InitialView() {
  const uploadCardRef = useRef<HTMLDivElement>(null);
  const uploadTitleRef = useRef<HTMLHeadingElement>(null);
  const uploadContentRef = useRef<HTMLDivElement>(null);

  const { hasAnimated, setHasAnimated } = useUploadFileStore();

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
    <div className="flex flex-col md:flex-row items-start gap-8">
      <div className="md:w-2/3 space-y-4">
        {/* Tähän GSAP Animaatio. Jokinen Ul listan teksti tulee yksitellen näkyviin j jokinen iconi pyörähtäen. */}
        <Card>
          <CardHeader>
            <CardTitle>Ominaisuudet</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimateText />
          </CardContent>
        </Card>
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Esimerkki julkaisu</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative h-[350px] ">
              <Scene />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="lg:w-1/3 space-y-8 flex-1">
        <Card ref={uploadCardRef}>
          <CardHeader>
            <CardTitle ref={uploadTitleRef}>Aloita tästä</CardTitle>
          </CardHeader>
          <CardContent ref={uploadContentRef}>
            <p className="text-sm text-gray-600 mb-4">
              Lataa kuva tuotteestasi ja anna Mainosmestarin luoda sinulle
              ammattimainen myynti-ilmoitus.
            </p>
            <FileUpload />
            <div className="mt-4 text-sm text-gray-500 flex items-start">
              <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
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
