import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { toPng } from "html-to-image";
import { Download } from "lucide-react";
import { useUploadFileStore } from "@/lib/store/store";
import { NavItems } from "./nav/nav-items";

type FloatingNavProps = {
  className?: string;
  onReupload: () => void;
};

export const FloatingNav: React.FC<FloatingNavProps> = ({
  className,
  onReupload,
}) => {
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const { contentRef } = useUploadFileStore();
  const navItems = NavItems();

  const captureScreenshot = async () => {
    if (contentRef && contentRef.current) {
      try {
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
      } catch (error) {
        console.error("Screenshotin ottaminen epäonnistui:", error);
      }
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50",
        className,
      )}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-2 flex items-center justify-center"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {navItems.map((item, index) => (
          <motion.button
            key={item.name}
            className={cn(
              "p-2 mx-1 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
              activeTab === index && "bg-gray-200 dark:bg-gray-600",
            )}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(activeTab === index ? null : index)}
          >
            {item.icon}
          </motion.button>
        ))}
      </motion.div>
      <AnimatePresence>
        {activeTab !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 mb-2"
          >
            {navItems[activeTab].content}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="mt-4 flex justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button onClick={onReupload} className="mr-4">
          Lataa uusi kuva
        </Button>
        <Button onClick={captureScreenshot} className="flex items-center gap-2">
          <Download size={16} />
          Lataa myynti-ilmoitus
        </Button>
      </motion.div>
    </div>
  );
};
