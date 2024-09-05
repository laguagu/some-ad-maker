import React from "react";
import { Eye } from "lucide-react";

export const VisualDesign = ({ design }: { design: string }) => (
  <div className="p-6 bg-white dark:bg-gray-800 border rounded-lg shadow-lg max-w-xl mx-auto">
    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center">
      <Eye className="mr-2" size={24} />
      Visuaalinen ilme-ehdotus:
    </h3>
    <p className="text-gray-700 dark:text-gray-200">{design}</p>
  </div>
);
