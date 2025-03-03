import { memo } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { useScrollToTop } from "../../../../hooks"

export const ScrollToTopButton = memo(function ScrollToTopButton() {
  const { showButton, scrollToTop } = useScrollToTop()
  if (!showButton) return null
  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-0 opacity-90 shadow-lg transition-all hover:opacity-100"
    >
      <ChevronUp className="h-5 w-5" />
      <span className="sr-only">Volver arriba</span>
    </Button>
  )
})
