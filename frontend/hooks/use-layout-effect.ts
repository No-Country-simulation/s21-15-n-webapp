"use client";

import { useEffect } from "react";

export interface LayoutEffectOptions {
  isActive: boolean;
  blurTarget?: string;
  blurClass?: string;
  overlayTarget?: string;
  overlayClass?: string;
}

export function useLayoutEffect({
  isActive,
  blurTarget = "#app-content",
  blurClass = "blur-sm",
  overlayTarget = "#menu-overlay",
  overlayClass = "bg-background/80",
}: LayoutEffectOptions) {
  useEffect(() => {
    const content = document.querySelector(blurTarget);
    const overlay = document.querySelector(overlayTarget);

    if (content && overlay && isActive) {
      content.classList.add(blurClass);
      overlay.classList.add(overlayClass);
    }

    return () => {
      if (content && overlay) {
        content.classList.remove(blurClass);
        overlay.classList.remove(overlayClass);
      }
    };
  }, [isActive, blurTarget, blurClass, overlayTarget, overlayClass]);
}
