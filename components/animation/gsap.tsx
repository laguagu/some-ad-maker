import { gsap } from "gsap";
import { CheckCircle } from "lucide-react";
import { useEffect, useRef } from "react";

type BoxProps = {
  index: number;
};

type TextProps = {
  text: string;
};

export const AnimateText: React.FC = () => {
  const textSections = [
    "Automaattinen myynti-ilmoituksen generointi",
    "Visuaalinen muokkausmahdollisuus",
    "Helppo jakaminen sosiaalisessa mediassa",
    "Tallennus myöhempää käyttöä varten",
  ];

  // Ref-viittaus ul-elementtiin animaatioita varten
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (listRef.current) {
      // Luodaan GSAP-aikajana animaatioita varten
      const tl = gsap.timeline();

      // Asetetaan elementtien alkutila
      // y: 20 siirtää elementit 20px alaspäin
      // opacity: 0 tekee elementeistä läpinäkyviä
      gsap.set(listRef.current.children, { y: 25, opacity: 0 });

      // Animoidaan jokainen lista-item
      tl.to(listRef.current.children, {
        duration: 0.5, // Animaation kesto sekunneissa
        y: 0, // Siirretään elementit takaisin alkuperäiseen y-positioon
        opacity: 1, // Tehdään elementeistä täysin näkyviä
        stagger: 0.2, // Viive elementtien välillä, luo porrastetun efektin
        ease: "power2.out", // Easing-funktio: nopea alku, hidastuva loppu
      });

      // Animoidaan ikonit
      tl.to(listRef.current.querySelectorAll(".icon"), {
        rotation: 360, // Pyöritetään ikoneita 360 astetta
        duration: 0.5, // Animaation kesto sekunneissa
        ease: "back.out(1.7)", // Easing-funktio: ylimeno ja palautus
        stagger: 0.1, // Pieni viive ikonien välillä
      });
    }
  }, []); // Tyhjä riippuvuuslista tarkoittaa, että efekti suoritetaan vain kerran

  return (
    <ul ref={listRef} className="space-y-4">
      {textSections.map((text, index) => (
        <li key={index} className="flex items-center space-x-3">
          <CheckCircle className="h-5 w-5 lg:h-6 lg:w-6 text-green-500 icon flex-shrink-0" />
          <span className="text-sm lg:text-base">{text}</span>
        </li>
      ))}
    </ul>
  );
};

const AnimatedBox: React.FC<BoxProps> = ({ index }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  type TextProps = {
    text: string;
    index: number;
  };

  useEffect(() => {
    if (boxRef.current) {
      gsap.to(boxRef.current, {
        x: 200,
        duration: 2,
        rotation: 360,
        ease: "power2.out",
        repeat: -1,
        yoyo: true,
        backgroundColor: "#8d3dae",
        delay: index * 0.5,
      });
    }
  }, [index]);

  return (
    <div ref={boxRef} className="w-24 h-24 bg-green-500 m-2.5">
      <p>asd</p>
    </div>
  );
};

export const SimpleBox = () => {
  const boxes = Array.from({ length: 5 }, (_, index) => (
    <AnimatedBox key={index} index={index} />
  ));

  return <div className="flex flex-col items-start">{boxes}</div>;
};

export const animateCard = (cardRef: React.RefObject<HTMLDivElement>) => {
  gsap.from(cardRef.current, {
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: "power3.out",
  });
};

export const animateCardTitle = (
  titleRef: React.RefObject<HTMLHeadingElement>,
) => {
  gsap.from(titleRef.current, {
    duration: 0.6,
    y: 20,
    opacity: 0,
    ease: "power2.out",
    delay: 0.2,
  });
};

export const animateCardContent = (
  contentRef: React.RefObject<HTMLDivElement>,
) => {
  gsap.from(contentRef.current?.children || [], {
    duration: 0.6,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    ease: "power2.out",
    delay: 0.4,
  });
};
