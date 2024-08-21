import React, { useRef, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  DraggableItem,
  TitleComponent,
  ImageComponent,
  DescriptionComponent,
  PriceComponent,
  FeaturesComponent,
} from "./draggable-item";
import { StyleCustomization, StyleProps } from "./style-customization";
import { ImageAnalysis } from "@/lib/schemas";
import { Tag, Info, ShoppingCart, List, Hash } from "lucide-react";
import html2canvas from "html2canvas";
import { Button } from "../ui/button";

interface DraggableAdLayoutProps {
  adData: ImageAnalysis;
}

interface ItemType {
  id: string;
  component: React.FC<any>;
  props: any;
}

export function DraggableAdLayout({ adData }: DraggableAdLayoutProps) {
  const [items, setItems] = useState<ItemType[]>([
    {
      id: "furniture",
      component: TitleComponent,
      props: { text: adData.furniture, icon: <Tag size={24} /> },
    },
    {
      id: "image",
      component: ImageComponent,
      props: { src: adData.imageUrl || "", alt: adData.furniture },
    },
    {
      id: "description",
      component: DescriptionComponent,
      props: { text: adData.description, icon: <Info size={24} /> },
    },
    {
      id: "price",
      component: PriceComponent,
      props: {
        amount: adData.price || "Hinta ei saatavilla",
        icon: <ShoppingCart size={24} />,
      },
    },
    {
      id: "features",
      component: FeaturesComponent,
      props: { features: adData.keyFeatures, icon: <List size={24} /> },
    },
    {
      id: "hashtags",
      component: FeaturesComponent,
      props: {
        features: adData.hashtags,
        icon: <Hash size={24} />,
        isHashtag: true,
      },
    },
  ]);
  const [styles, setStyles] = useState<StyleProps>({
    backgroundColor: "#FFFFFF",
    textColor: "#000000",
    fontSize: 16,
  });

  const adLayoutRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  const handleStyleChange = (newStyles: Partial<StyleProps>) => {
    setStyles((prevStyles: any) => ({ ...prevStyles, ...newStyles }));
  };
  // Two different ways to save the ad layout as an image are shown below.
  const handleSaveAsImage = async () => {
    if (adLayoutRef.current) {
      try {
        console.log("Aloitetaan kuvan tallennus");

        // Aseta väliaikaiset tyylit
        const originalStyles = adLayoutRef.current.getAttribute("style");
        adLayoutRef.current.style.width = "600px";
        adLayoutRef.current.style.margin = "0";
        adLayoutRef.current.style.padding = "20px";
        adLayoutRef.current.style.backgroundColor = "#ffffff";

        console.log("Väliaikaiset tyylit asetettu");

        const canvas = await html2canvas(adLayoutRef.current, {
          useCORS: true,
          scale: 2,
          logging: true,
          backgroundColor: "#ffffff",
          onclone: (clonedDoc) => {
            console.log("Kloonaus suoritettu");
            const clonedElement = clonedDoc.body.querySelector(
              "#ad-layout-container",
            );
            if (clonedElement) {
              console.log("Kloonattu elementti löydetty");
            } else {
              console.log("Kloonattua elementtiä ei löydetty");
            }
          },
        });

        console.log("Canvas luotu");

        const image = canvas.toDataURL("image/png", 1.0);
        console.log("Kuva luotu, pituus:", image.length);

        const link = document.createElement("a");
        link.href = image;
        link.download = "myynti-ilmoitus.png";
        link.click();

        console.log("Latauslinkki luotu ja klikattu");

        // Palauta alkuperäiset tyylit
        if (originalStyles) {
          adLayoutRef.current.setAttribute("style", originalStyles);
        } else {
          adLayoutRef.current.removeAttribute("style");
        }

        console.log("Alkuperäiset tyylit palautettu");
      } catch (error) {
        console.error("Virhe kuvan tallennuksessa:", error);
      }
    } else {
      console.log("Myynti-ilmoitus ei ole vielä valmis tallennettavaksi");
    }
  };
  // const handleSaveAsImage = async () => {
  //   if (adLayoutRef.current) {
  //     try {
  //       const canvas = await html2canvas(adLayoutRef.current, {
  //         useCORS: true,
  //         scale: 2,
  //         logging: true,
  //         allowTaint: true,
  //         onclone: (clonedDoc) => {
  //           const clonedElement = clonedDoc.body.querySelector(
  //             "[data-html2canvas-ignore]",
  //           );
  //           if (clonedElement) {
  //             clonedElement.removeAttribute("data-html2canvas-ignore");
  //           }
  //         },
  //       });
  //       const image = canvas.toDataURL("image/png", 1.0);
  //       const link = document.createElement("a");
  //       link.href = image;
  //       link.download = "myynti-ilmoitus.png";
  //       link.click();
  //     } catch (error) {
  //       console.error("Virhe kuvan tallennuksessa:", error);
  //     }
  //   } else {
  //     console.log("Myynti-ilmoitus ei ole vielä valmis tallennettavaksi");
  //   }
  // };
  return (
    <div>
      <StyleCustomization onStyleChange={handleStyleChange} />
      <div ref={adLayoutRef}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div
              className="space-y-4 p-4"
              style={{
                backgroundColor: styles.backgroundColor,
                color: styles.textColor,
                fontSize: `${styles.fontSize}px`,
              }}
            >
              {items.map((item) => (
                <DraggableItem key={item.id} id={item.id}>
                  <item.component {...item.props} />
                </DraggableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <Button onClick={handleSaveAsImage} className="mt-4">
        Lataa kuva
      </Button>
    </div>
  );
}
