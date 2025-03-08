"use client"

import { useState, useEffect, useCallback } from "react"

export interface MousePosition {
  x: number
  y: number
}

export function useMouseReflection() {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    })
  }, [])

  useEffect(() => {
    setIsMounted(true)
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  return { mousePosition, isMounted }
}

