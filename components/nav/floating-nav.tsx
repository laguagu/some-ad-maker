import { useUploadFileStore } from "@/lib/store/store";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { toPng } from "html-to-image";
import { Download, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { NavItems } from "./nav-items";

type FloatingNavProps = {
  onReupload: () => void;
  isAnalysisComplete: boolean;
};

export const FloatingNav: React.FC<FloatingNavProps> = ({
  onReupload,
  isAnalysisComplete,
}) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const { contentRef } = useUploadFileStore();
  const navItems = NavItems();
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isAnalysisComplete) {
      const animateAndNotify = async () => {
        await controls.start({
          y: 0,
          opacity: 1,
        });
        setIsVisible(true);
        toast.success(
          "Voit muokata kuvaa ja vaihtaa näkymää työkalupalkin avulla.",
          {
            style: {
              marginBottom: "152px",
            },
            duration: 6000,
          },
        );
      };

      controls.set({ y: 100, opacity: 0 });
      setTimeout(animateAndNotify, 1200);
    }
  }, [controls, isAnalysisComplete]);

  if (!isAnalysisComplete) {
    return null;
  }

  const captureScreenshot = async () => {
    if (contentRef && contentRef.current) {
      try {
        // Hide edit icons before taking screenshot
        const editIcons = contentRef.current.querySelectorAll(".edit-icon");
        editIcons.forEach((icon) => {
          (icon as HTMLElement).style.display = "none";
        });

        const scale = 2;
        const element = contentRef.current;

        // Lasketaan todellinen sisällön leveys
        const computedStyle = window.getComputedStyle(element);
        const paddingLeft = parseFloat(computedStyle.paddingLeft);
        const paddingRight = parseFloat(computedStyle.paddingRight);
        const contentWidth = element.scrollWidth - paddingLeft - paddingRight;

        // Käytetään suurempaa arvoa elementin leveydestä tai sisällön leveydestä
        const width = Math.max(element.offsetWidth, contentWidth) * scale;
        const height = element.scrollHeight * scale;

        const dataUrl = await toPng(element, {
          quality: 1,
          width,
          height,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${width / scale}px`,
            height: `${height / scale}px`,
            maxWidth: "none", // Poistetaan max-width rajoitus
          },
        });

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "myynti-ilmoitus.png";
        link.click();

        // Show edit icons again
        editIcons.forEach((icon) => {
          (icon as HTMLElement).style.display = "";
        });
      } catch (error) {
        console.error("Screenshotin ottaminen epäonnistui:", error);
      }
    }
  };

  const allNavItems = [
    ...navItems,
    {
      name: "Aloita alusta",
      icon: <RefreshCw size={16} />,
      content: (
        <Button onClick={onReupload} className="w-full">
          Aloita alusta
        </Button>
      ),
    },
    {
      name: "Lataa myynti-ilmoitus",
      icon: <Download size={16} />,
      content: (
        <Button
          onClick={captureScreenshot}
          className="w-full flex items-center justify-center gap-2"
        >
          {/* <Download size={16} /> */}
          Lataa myynti-ilmoitus
        </Button>
      ),
    },
  ];
  const isViewSelectorActive = activeTab === 2;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1, // Säädä tätä muuttaaksesi yksittäisen navigointi itemin animaatiota kestoa milloin seuraava alkaa toisesta
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  return (
    <TooltipProvider>
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-[320px]">
        <motion.div animate={controls} className="w-full">
          {isVisible && (
            <motion.div
              className={cn(
                "bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex items-center justify-center",
                isViewSelectorActive ? "w-full" : "w-auto",
              )}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {allNavItems.map((item, index) => (
                <motion.div key={item.name} variants={itemVariants}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        className={cn(
                          "p-2 mx-1 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                          activeTab === index && "bg-gray-200 dark:bg-gray-600",
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setActiveTab(activeTab === index ? null : index)
                        }
                      >
                        {item.icon}
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white px-3 py-2 rounded-md shadow-lg text-sm font-medium z-50">
                      <p>{item.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
        <AnimatePresence>
          {activeTab !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-2 w-full p-4"
            >
              {allNavItems[activeTab].content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </TooltipProvider>
  );
};
