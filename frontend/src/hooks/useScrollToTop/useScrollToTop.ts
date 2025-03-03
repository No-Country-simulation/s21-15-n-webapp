import { useState, useEffect, useCallback } from "react"

export function useScrollToTop() {
  const [showButton, setShowButton] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const checkScrollPosition = useCallback(() => {
    if (typeof window !== "undefined") {
      setShowButton(window.scrollY > 100)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    setIsAnimating(true)

    // Primero iniciamos la animación del botón
    setTimeout(() => {
      // Después de un pequeño delay, hacemos el scroll
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })

      // Reseteamos la animación después de que termine
      setTimeout(() => {
        setIsAnimating(false)
      }, 1000) // Este tiempo debe coincidir con la duración de la animación
    }, 100)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition)
    return () => window.removeEventListener("scroll", checkScrollPosition)
  }, [checkScrollPosition])

  return { showButton, isAnimating, scrollToTop }
}
