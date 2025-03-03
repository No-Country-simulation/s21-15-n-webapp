"use client";

import { useCallback } from "react";

export function useSmoothScroll() {
  const scrollToSection = useCallback((elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      const header = document.querySelector("header");
      const headerHeight = header?.offsetHeight ?? 0;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  }, []);

  return { scrollToSection };
}
