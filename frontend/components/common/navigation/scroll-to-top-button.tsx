"use client"

import { memo } from "react"
import { Rocket } from "lucide-react"
import { useScrollToTop } from "@/hooks/use-scroll-to-top"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Textos locales para el botón de scroll-to-top
const SCROLL_BUTTON_TEXT = {
  ariaLabel: "Volver arriba",
}

export const ScrollToTopButton = memo(function ScrollToTopButton() {
  const { showButton, isAnimating, isFlying, scrollToTop } = useScrollToTop()

  if (!showButton) return null

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-30 h-12 w-12 rounded-full",
        "bg-[#0a082b] p-0 opacity-90 shadow-lg transition-all overflow-hidden",
        "hover:opacity-100 hover:shadow-[#2b00eb]/30",
        isAnimating && "pointer-events-none", // Prevenir clics durante la animación
        isFlying && "animate-fly-away",
      )}
    >
      <Rocket
        className={cn(
          "h-6 w-6 transition-transform duration-300 text-[#2b00eb]",
          "drop-shadow-[0_0_10px_rgba(43,0,235,0.5)]", // Resplandor del color del Figma
          isFlying ? "animate-rocket-fly" : "-rotate-45",
        )}
        strokeWidth={2.5} // Aumentar el grosor del trazo para mejor visibilidad
      />
      <span className="sr-only">{SCROLL_BUTTON_TEXT.ariaLabel}</span>
    </Button>
  )
})
