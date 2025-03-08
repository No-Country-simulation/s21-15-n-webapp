"use client"

import { useEffect } from "react"

export function useSectionVisibility() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("section-hidden")
            entry.target.classList.add("section-visible")
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    const sections = document.querySelectorAll(".section-hidden")
    sections.forEach((section) => observer.observe(section))

    return () => {
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])
}

