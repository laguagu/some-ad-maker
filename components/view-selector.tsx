import React from "react";
import { Button } from "@/components/ui/button";

type ViewSelectorProps = {
  currentView: "analysis" | "draggable" | "instagram";
  onViewChange: (view: "analysis" | "draggable" | "instagram") => void;
};

export const ViewSelector: React.FC<ViewSelectorProps> = ({
  currentView,
  onViewChange,
}) => {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <Button
        onClick={() => onViewChange("analysis")}
        variant={currentView === "analysis" ? "default" : "outline"}
      >
        Yleinen näkymä
      </Button>
      <Button
        onClick={() => onViewChange("instagram")}
        variant={currentView === "instagram" ? "default" : "outline"}
      >
        Instragram näkymä
      </Button>
    </div>
  );
};
