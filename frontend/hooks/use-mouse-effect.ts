"use client"

import { useState, useEffect, useCallback } from "react"

export interface MousePosition {
  x: number
  y: number
}

export interface MouseEffectOptions {
  enabled?: boolean
  intensity?: number
  smoothing?: number
  maxDistance?: number
}

export function useMouseEffect({
  enabled = true,
  intensity = 0.3,
  smoothing = 0.1,
  maxDistance = 100,
}: MouseEffectOptions = {}) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!enabled) return

      const rect = document.documentElement.getBoundingClientRect()
      const x = (e.clientX / rect.width) * maxDistance
      const y = (e.clientY / rect.height) * maxDistance

      setTargetPosition({ x, y })
    },
    [enabled, maxDistance],
  )

  // Efecto de suavizado
  useEffect(() => {
    if (!enabled) return

    let animationFrameId: number

    const animate = () => {
      setMousePosition((current) => ({
        x: current.x + (targetPosition.x - current.x) * smoothing,
        y: current.y + (targetPosition.y - current.y) * smoothing,
      }))
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [enabled, smoothing, targetPosition])

  // Event listeners
  useEffect(() => {
    setIsMounted(true)
    if (enabled) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [enabled, handleMouseMove])

  const transformStyle = {
    transform: `translate(${mousePosition.x * intensity}px, ${mousePosition.y * intensity}px)`,
  }

  return {
    mousePosition,
    transformStyle,
    isMounted,
  }
}

