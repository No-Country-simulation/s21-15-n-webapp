"use client"

import { useState, useEffect, useCallback } from "react"

export function useScrollToTop() {
  const [showButton, setShowButton] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFlying, setIsFlying] = useState(false)

  const checkScrollPosition = useCallback(() => {
    if (typeof window !== "undefined") {
      setShowButton(window.scrollY > 400)
    }
  }, [])

  const scrollToTop = useCallback(() => {
    if (isAnimating) return // Prevenir múltiples clics durante la animación

    setIsAnimating(true)
    setIsFlying(true)

    // Iniciamos la animación del cohete
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    // Esperamos a que termine la animación de vuelo
    setTimeout(() => {
      setIsFlying(false)

      // Esperamos un poco más para quitar la animación completa
      setTimeout(() => {
        setIsAnimating(false)
        setShowButton(false)
      }, 300)
    }, 1200)
  }, [isAnimating])

  useEffect(() => {
    window.addEventListener("scroll", checkScrollPosition)
    return () => window.removeEventListener("scroll", checkScrollPosition)
  }, [checkScrollPosition])

  return { showButton, isAnimating, isFlying, scrollToTop }
}
