"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { Rocket } from "lucide-react"
import { useScrollToTop } from "@/hooks/use-scroll-to-top"
import { cn } from "@/lib/utils/utils"

export const ScrollToTopButton = memo(function ScrollToTopButton() {
  const { showButton, isAnimating, scrollToTop } = useScrollToTop()

  if (!showButton) return null

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full",
        "bg-primary p-0 opacity-90 shadow-lg transition-all",
        "hover:opacity-100 hover:bg-primary/90 hover:shadow-primary/50",
        isAnimating && "animate-rocket-launch",
      )}
    >
      <Rocket className={cn("h-6 w-6 transition-transform duration-300", isAnimating ? "-rotate-45" : "rotate-0")} />
      <span className="sr-only">Volver arriba</span>
    </Button>
  )
})
