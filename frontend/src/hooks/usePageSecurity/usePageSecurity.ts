import { useState, useEffect, useCallback } from "react"

export function usePageSecurity() {
  const [isVisible, setIsVisible] = useState(true)
  const [wasHidden, setWasHidden] = useState(false)

  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      setIsVisible(false)
      setWasHidden(true)
      document.title = "🔒 Página Bloqueada - Regresa para desbloquear"
    } else {
      setIsVisible(true)
      document.title = "StartPerks - Transforma tu carrera"
    }
  }, [])

  useEffect(() => {
    const originalTitle = document.title
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.title = originalTitle
    }
  }, [handleVisibilityChange])

  const handleUnlock = useCallback(() => {
    setWasHidden(false)
  }, [])

  return { isVisible, wasHidden, handleUnlock }
}
