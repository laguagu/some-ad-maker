import React from "react";
import { CheckCircle } from "lucide-react";
import { FileUpload } from "./ui/file-upload";
import { ComapreImages } from "./compare-imgs";

export function InitialView() {
  return (
    <div className="flex flex-col md:flex-row items-start gap-8">
      <div className="md:w-2/3 space-y-4">
        <ul className="space-y-2">
          {[
            "Automaattinen myynti-ilmoituksen generointi",
            "Visuaalinen muokkausmahdollisuus",
            "Helppo jakaminen sosiaalisessa mediassa",
            "Tallennus myöhempää käyttöä varten",
          ].map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <ComapreImages />
        </div>
      </div>
      <div className="md:w-1/3">
        <FileUpload />
      </div>
    </div>
  );
}
