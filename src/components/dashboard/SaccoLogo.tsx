
import React from "react";

interface SaccoLogoProps {
  size?: "sm" | "md" | "lg";
  withText?: boolean;
}

export function SaccoLogo({ size = "md", withText = true }: SaccoLogoProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  return (
    <div className={`flex items-center space-x-2`}>
      <div className={`${sizeClasses[size]} bg-sacco-900 rounded-full flex items-center justify-center text-white font-bold overflow-hidden`}>
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-lg">TU</span>
          </div>
          <div className="absolute bottom-0 w-full h-1/3 bg-purple-500"></div>
        </div>
      </div>
      
      {withText && (
        <span className="text-xl font-semibold text-sacco-900">
          Times U Sacco
        </span>
      )}
    </div>
  );
}
