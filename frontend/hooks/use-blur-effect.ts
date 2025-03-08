"use client"

import { useEffect } from "react"

export function useBlurEffect(isActive: boolean) {
  useEffect(() => {
    const mainContent = document.getElementById("main-content")
    const header = document.querySelector("header")

    if (mainContent && header) {
      if (isActive) {
        mainContent.style.filter = "blur(8px)"
        mainContent.style.transition = "filter 0.3s ease"
        // Evitar que el header se difumine
        header.style.filter = "none"
      } else {
        mainContent.style.filter = "none"
      }
    }

    return () => {
      if (mainContent) {
        mainContent.style.filter = "none"
      }
    }
  }, [isActive])
}

