"use client"

import { useMouseEffect } from "@/hooks/use-mouse-effect"
import { cn } from "@/lib/utils/utils"

interface MouseReflectionProps {
  className?: string
  intensity?: number
  color?: string
  blur?: number
  opacity?: number
}

export function MouseReflection({
  className,
  intensity = 1, // Aumentado de 1.2 a 2
  color = "rgba(139, 92, 246, 0.4)", // Color púrpura más intenso
  blur = 150, // Aumentado de 100 a 150
  opacity = 0.5, // Mantenido en 0.5
}: MouseReflectionProps) {
  const { mousePosition, isMounted } = useMouseEffect({
    intensity,
    smoothing: 0.1, // Suavizado ligeramente aumentado
  })

  if (!isMounted) return null

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-0", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
      <div
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            ${color} 0%,
            transparent ${blur}%
          )`,
          opacity,
          transform: `translate(${(mousePosition.x - 50) * 0.08}%, ${(mousePosition.y - 50) * 0.08}%)`,
        }}
      />
    </div>
  )
}
