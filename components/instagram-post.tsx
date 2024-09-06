"use client";

import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Check,
  Edit,
  Upload,
  MoreVertical,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { StreamedAnalysis } from "@/lib/types";
import Image from "next/image";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { useUploadFileStore } from "@/lib/store/store";

interface PostProps {
  analysis: StreamedAnalysis;
  imageUrl: string;
  initialStoreName?: string;
}

export default function InstagramPost({
  analysis,
  imageUrl,
  initialStoreName = "HuonekaluKauppa",
}: PostProps) {
  const { setContentRef, showHashtags, storeAvatarUrl, setStoreAvatarUrl } =
    useUploadFileStore();
  const localContentRef = useRef<HTMLDivElement>(null);
  const [storeName, setStoreName] = useState(initialStoreName);
  const [isEditingName, setIsEditingName] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="space-y-4">
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
                <Button variant="ghost" size="icon">
                  <Heart className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Send className="h-6 w-6" />
                </Button>
              </div>
              <Button variant="ghost" size="icon">
                <Bookmark className="h-6 w-6" />
              </Button>
            </div>
            <div className="space-y-2">
              {analysis.furniture && (
                <h2 className="font-bold text-lg">{analysis.furniture}</h2>
              )}
              {analysis.price && (
                <p className="font-semibold">{analysis.price}</p>
              )}
              {analysis.description && <p>{analysis.description}</p>}
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
