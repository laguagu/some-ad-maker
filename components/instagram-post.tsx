"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUploadFileStore } from "@/lib/store/store";
import { StreamedAnalysis } from "@/lib/types";
import clsx from "clsx";
import { gsap } from "gsap";
import {
  Bookmark,
  Check,
  Edit,
  Heart,
  MessageCircle,
  MoreVertical,
  Send,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface PostProps {
  analysis: StreamedAnalysis | any;
  imageUrl?: string;
  initialStoreName?: string;
}

export default function InstagramPost({
  analysis: initialAnalysis,
  imageUrl,
  initialStoreName = "Mainosmestari",
}: PostProps) {
  const { setContentRef, showHashtags, storeAvatarUrl, setStoreAvatarUrl } =
    useUploadFileStore();
  const localContentRef = useRef<HTMLDivElement>(null);
  const [storeName, setStoreName] = useState(initialStoreName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingFurniture, setIsEditingFurniture] = useState(false);
  const [isEditingPrice, setIsEditingPrice] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [analysis, setAnalysis] = useState(initialAnalysis);

  const heartRef = useRef<SVGSVGElement>(null);
  const messageRef = useRef<SVGSVGElement>(null);
  const sendRef = useRef<SVGSVGElement>(null);
  const bookmarkRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setContentRef(localContentRef);
  }, [setContentRef]);

  const handleNameEdit = () => {
    setIsEditingName(true);
  };

  const handleNameSave = () => {
    setIsEditingName(false);
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("file", file);

      const reader = new FileReader();
      reader.onload = (e) => {
        setStoreAvatarUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysisChange = (
    field: keyof StreamedAnalysis,
    value: string,
  ) => {
    setAnalysis((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleKeyDown = (e: React.KeyboardEvent, field: string) => {
    if (e.key === "Enter") {
      e.preventDefault();
      switch (field) {
        case "furniture":
          setIsEditingFurniture(false);
          break;
        case "price":
          setIsEditingPrice(false);
          break;
        case "description":
          setIsEditingDescription(false);
          break;
      }
    }
  };

  useEffect(() => {
    console.log("analysis", analysis);
  }, [analysis]);
  const animateIcon = (iconRef: React.RefObject<SVGSVGElement>) => {
    gsap.to(iconRef.current, {
      rotation: 360,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div className="space-y-4 mb-10">
      <div className="flex items-center justify-center space-x-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={storeAvatarUrl ?? ""} alt="Store avatar" />
          <AvatarFallback>{storeName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
          <Upload className="h-4 w-4 mr-2" />
          Change Avatar
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleAvatarUpload}
        />
      </div>

      <div ref={localContentRef}>
        <Card className="max-w-md mx-auto">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={storeAvatarUrl ?? ""} alt="Store avatar" />
                <AvatarFallback>
                  {storeName.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                {isEditingName ? (
                  <Input
                    value={storeName}
                    onChange={(e: {
                      target: { value: SetStateAction<string> };
                    }) => setStoreName(e.target.value)}
                    onBlur={handleNameSave}
                    className="font-semibold p-1 text-sm"
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{storeName}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleNameEdit}
                    >
                      <Edit className="h-3 w-3 edit-icon" />
                    </Button>
                  </div>
                )}
                <p
                  className="text-sm text-muted-foreground"
                  style={{ marginTop: "-4px" }}
                >
                  Sponsoroitu
                </p>
              </div>
            </div>
            <MoreVertical className="h-5 w-5" />
          </CardHeader>
          <CardContent className="p-0">
            {imageUrl ? (
              <Image
                width={400}
                height={400}
                src={imageUrl}
                alt={analysis.furniture || "Furniture"}
                className="w-full h-auto object-cover aspect-square"
              />
            ) : (
              <div className="w-full h-80 bg-muted flex items-center justify-center">
                No image available
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col p-4">
            <div className="flex justify-between items-center w-full mb-4">
              <div className="flex gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => animateIcon(heartRef)}
                >
                  <Heart className="h-6 w-6" ref={heartRef} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => animateIcon(messageRef)}
                >
                  <MessageCircle className="h-6 w-6" ref={messageRef} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => animateIcon(sendRef)}
                >
                  <Send className="h-6 w-6" ref={sendRef} />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => animateIcon(bookmarkRef)}
              >
                <Bookmark className="h-6 w-6" ref={bookmarkRef} />
              </Button>
            </div>
            <div className="space-y-2">
              {analysis.furniture && (
                <div className="relative group">
                  {isEditingFurniture ? (
                    <Input
                      value={analysis.furniture}
                      onChange={(e) =>
                        handleAnalysisChange("furniture", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, "furniture")}
                      onBlur={() => setIsEditingFurniture(false)}
                      className="font-bold text-lg "
                      autoFocus
                    />
                  ) : (
                    <h2
                      className="font-bold text-lg cursor-pointer hover:text-gray-400 "
                      onClick={() => setIsEditingFurniture(true)}
                    >
                      {analysis.furniture}
                    </h2>
                  )}
                  <Edit
                    size={16}
                    className={clsx(
                      "absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400  transition-opacity duration-300",
                      {
                        "opacity-0": isEditingFurniture,
                        "opacity-0 group-hover:opacity-100":
                          !isEditingFurniture,
                      },
                    )}
                  />
                </div>
              )}
              {analysis.price && (
                <div className="flex items-center space-x-1.5 my-2">
                  <Label
                    htmlFor="price"
                    className="text-lg font-semibold whitespace-nowrap"
                  >
                    Hinta:
                  </Label>
                  <div className="relative group flex-grow ">
                    {isEditingPrice ? (
                      <Input
                        id="price"
                        value={analysis.price}
                        onChange={(e) =>
                          handleAnalysisChange("price", e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, "price")}
                        onBlur={() => setIsEditingPrice(false)}
                        className="font-semibold pl-0 pr-6"
                        autoFocus
                      />
                    ) : (
                      <p
                        className="font-semibold cursor-pointer text-lg hover:text-gray-400 transition-colors duration-200 pl-0"
                        onClick={() => setIsEditingPrice(true)}
                      >
                        {analysis.price}
                      </p>
                    )}
                    <Edit
                      size={16}
                      className={clsx(
                        "absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 transition-opacity duration-300",
                        {
                          "opacity-0": isEditingPrice,
                          "opacity-0 group-hover:opacity-100": !isEditingPrice,
                        },
                      )}
                    />
                  </div>
                </div>
              )}
              {analysis.description && (
                <div className="relative group">
                  {isEditingDescription ? (
                    <Textarea
                      value={analysis.description}
                      onChange={(e) =>
                        handleAnalysisChange("description", e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, "description")}
                      onBlur={() => setIsEditingDescription(false)}
                      className="w-full p-2 border rounded"
                      rows={6}
                      autoFocus
                    />
                  ) : (
                    <p
                      className="cursor-pointer hover:text-gray-400"
                      onClick={() => setIsEditingDescription(true)}
                    >
                      {analysis.description}
                    </p>
                  )}
                  <Edit
                    size={16}
                    className={clsx(
                      "absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400  transition-opacity duration-300",
                      {
                        "opacity-0": isEditingDescription,
                        "opacity-0 group-hover:opacity-100":
                          !isEditingDescription,
                      },
                    )}
                  />
                </div>
              )}
              {analysis.keyFeatures && analysis.keyFeatures.length > 0 && (
                <ul className="space-y-1">
                  {analysis.keyFeatures.map(
                    (feature: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ),
                  )}
                </ul>
              )}
              {analysis.callToAction && (
                <p className="font-semibold">{analysis.callToAction}</p>
              )}
              {showHashtags &&
                analysis.hashtags &&
                analysis.hashtags.length > 0 && (
                  <p className="text-sm text-blue-500">
                    {analysis.hashtags.map((tag: string) => `${tag}`).join(" ")}
                  </p>
                )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
