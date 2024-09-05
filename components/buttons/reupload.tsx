import { Upload } from "lucide-react";
import { Button } from "../ui/button";
import { useCallback, useRef } from "react";
import { useUploadFileStore } from "@/lib/store/store";

export const ReuploadButton = () => {
  const { setFile, setPreviewUrl } = useUploadFileStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFile = event.target.files?.[0] || null;
      if (newFile) {
        setFile(newFile);
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target?.result as string);
        };
        reader.readAsDataURL(newFile);
      } else {
        setFile(null);
        setPreviewUrl(null);
      }
    },
    [setFile, setPreviewUrl],
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outline"
        className="flex items-center"
      >
        <Upload className="mr-2 h-4 w-4" /> Lataa uusi kuva
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />
    </>
  );
};
