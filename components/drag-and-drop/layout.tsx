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
import { useUploadFileStore } from "@/lib/store/store";

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
  const { setContentRef } = useUploadFileStore();
  const localContentRef = useRef<HTMLDivElement>(null);
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

  const handleItemClick = useCallback((id: string) => {
    console.log("Item clicked:", id);
    setSelectedItemId((prevId) => (prevId === id ? null : id));
  }, []);

  useEffect(() => {
    console.log("itemstyles", itemStyles);
  }, [itemStyles]);

  useEffect(() => {
    setContentRef(localContentRef);
  }, [setContentRef]);

  return (
    <div className="bg-white">
      <StyleCustomization onStyleChange={handleStyleChange} />
      <div className="grid-layout-container">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-2 gap-4 p-4" ref={localContentRef}>
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
    </div>
  );
}
