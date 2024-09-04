import React, { useCallback, useEffect, useRef, useState } from "react";
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
  rectSortingStrategy,
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
import { ImageAnalysis, PartialImageAnalysis } from "@/lib/types";
import { Tag, Info, ShoppingCart, List, Hash, CheckCircle } from "lucide-react";
import html2canvas from "html2canvas";
import { Button } from "../ui/button";

interface DraggableAdLayoutProps {
  adData: PartialImageAnalysis;
  imageUrl: string;
}

interface ItemType {
  id: string;
  component: React.FC<any>;
  props: any;
}

export function DraggableAdLayout({
  adData,
  imageUrl,
}: DraggableAdLayoutProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [itemStyles, setItemStyles] = useState<Record<string, StyleProps>>({});
  const [items, setItems] = useState<ItemType[]>([
    {
      id: "furniture",
      component: TitleComponent,
      props: { text: adData.furniture, icon: <Tag size={24} /> },
    },
    {
      id: "image",
      component: ImageComponent,
      props: { src: imageUrl || "", alt: adData.furniture },
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

  const adLayoutRef = useRef<HTMLDivElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleStyleChange = useCallback(
    (newStyles: Partial<StyleProps>) => {
      if (selectedItemId) {
        console.log("Updating styles for", selectedItemId, "with", newStyles);
        setItemStyles((prev) => ({
          ...prev,
          [selectedItemId]: { ...prev[selectedItemId], ...newStyles },
        }));
      }
    },
    [selectedItemId],
  );

  const handleSaveAsImage = async () => {
    if (adLayoutRef.current) {
      try {
        console.log("Aloitetaan kuvan tallennus");

        // Piilota valintaikonit ja poista valitun elementin taustaväri väliaikaisesti
        const selectionIcons =
          adLayoutRef.current.querySelectorAll(".selection-icon");
        const selectedItems =
          adLayoutRef.current.querySelectorAll(".selected-item");

        selectionIcons.forEach(
          (icon) => ((icon as HTMLElement).style.display = "none"),
        );
        selectedItems.forEach((item) => {
          (item as HTMLElement).style.backgroundColor = "transparent";
          (item as HTMLElement).style.border = "none";
        });

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
        });

        console.log("Canvas luotu");

        const image = canvas.toDataURL("image/png", 1.0);
        console.log("Kuva luotu, pituus:", image.length);

        const link = document.createElement("a");
        link.href = image;
        link.download = "myynti-ilmoitus.png";
        link.click();

        console.log("Latauslinkki luotu ja klikattu");

        // Palauta valintaikonit näkyviin ja valitun elementin taustaväri
        selectionIcons.forEach(
          (icon) => ((icon as HTMLElement).style.display = ""),
        );
        selectedItems.forEach((item) => {
          (item as HTMLElement).style.backgroundColor = "";
          (item as HTMLElement).style.border = "";
        });

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

  const handleItemClick = useCallback((id: string) => {
    console.log("Item clicked:", id);
    setSelectedItemId((prevId) => (prevId === id ? null : id));
  }, []);

  useEffect(() => {
    console.log("itemstyles", itemStyles);
  }, [itemStyles]);

  return (
    <div className="bg-white">
      <StyleCustomization onStyleChange={handleStyleChange} />
      <div className="grid-layout-container" ref={adLayoutRef}>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid grid-cols-2 gap-4 p-4">
              {items.map((item) => (
                <DraggableItem
                  key={item.id}
                  id={item.id}
                  isSelected={item.id === selectedItemId}
                  onClick={() => handleItemClick(item.id)}
                >
                  <div className="relative">
                    <div
                      className="selection-icon absolute top-2 right-2 cursor-pointer z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item.id);
                      }}
                    >
                      <CheckCircle
                        size={24}
                        color={
                          item.id === selectedItemId ? "#4CAF50" : "#E0E0E0"
                        }
                      />
                    </div>
                    <item.component
                      {...item.props}
                      style={itemStyles[item.id] || {}}
                    />
                  </div>
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
