import React from "react";
import { ShoppingCart } from "lucide-react";

export const AnalysisCallToAction = ({
  callToAction,
  textColor,
}: {
  callToAction: string;
  textColor: string;
}) => (
  <p
    className="text-lg font-semibold mb-4 flex items-center"
    style={{ color: textColor }}
  >
    <ShoppingCart className="mr-2" size={24} />
    {callToAction}
  </p>
);
