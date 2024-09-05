import React from "react";
import { DraggableAdLayout } from "./drag-and-drop/layout";
import DefaultAnalyze from "@/components/default-analyze";
import { StreamedAnalysis } from "@/lib/types";

type ViewProps = {
  analysis: StreamedAnalysis;
  imageUrl: string;
  showColorScheme: boolean;
};

const views = {
  draggable: (props: ViewProps) => (
    <DraggableAdLayout adData={props.analysis} imageUrl={props.imageUrl} />
  ),
  analysis: (props: ViewProps) => (
    <DefaultAnalyze
      analysis={props.analysis}
      imageUrl={props.imageUrl}
      showColorScheme={props.showColorScheme}
    />
  ),
};

type ViewRendererProps = ViewProps & {
  currentView: keyof typeof views;
};

export const ViewRenderer: React.FC<ViewRendererProps> = ({
  currentView,
  ...props
}) => {
  const ViewComponent = views[currentView];
  return <ViewComponent {...props} />;
};
