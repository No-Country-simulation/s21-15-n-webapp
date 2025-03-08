"use client"

import { useEffect } from "react"
import { useNavigationStore } from "@/lib/streams/landing.stream"

export function useActiveSection() {
  const { setActiveNavItem } = useNavigationStore()

  useEffect(() => {
    // Función para determinar qué sección está en el viewport
    const handleScroll = () => {
      // Obtener todas las secciones con ID
      const sections = document.querySelectorAll("section[id]")

      // Encontrar la sección que está más visible en el viewport
      let currentSection = ""
      let maxVisibility = 0

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Calcular qué porcentaje de la sección es visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
        const sectionHeight = rect.height

        // Mejorar el cálculo de visibilidad para secciones grandes
        const visibilityPercentage = Math.min(visibleHeight / sectionHeight, 1.0)

        // Dar prioridad a las secciones que están en la parte superior de la pantalla
        const topVisibility = 1 - Math.max(0, rect.top) / windowHeight
        const weightedVisibility = visibilityPercentage * (rect.top < 0 ? 0.8 : 1.0) * topVisibility

        // Si esta sección es más visible que la anterior más visible
        if (weightedVisibility > maxVisibility && visibilityPercentage > 0.2) {
          maxVisibility = weightedVisibility
          currentSection = section.id
        }
      })

      if (currentSection) {
        setActiveNavItem(currentSection)
      }
    }

    // Ejecutar al montar y en cada scroll
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    // También actualizar cuando cambie el tamaño de la ventana
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [setActiveNavItem])
}

