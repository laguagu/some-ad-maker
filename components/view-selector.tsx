import React from "react";
import { Button } from "@/components/ui/button";

type ViewSelectorProps = {
  currentView: "analysis" | "draggable";
  onViewChange: (view: "analysis" | "draggable") => void;
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
        Perinteinen näkymä
      </Button>
      <Button
        onClick={() => onViewChange("draggable")}
        variant={currentView === "draggable" ? "default" : "outline"}
      >
        Muokattava näkymä
      </Button>
    </div>
  );
};
