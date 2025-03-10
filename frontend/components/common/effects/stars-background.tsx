"use client"

import { useRandomStars } from "@/hooks/use-random-stars"

export type StarColor = "primary" | "secondary" | "accent" | "magenta" | "white" | "destructive" | "custom"

interface StarsBackgroundProps {
 readonly count?: number
 readonly className?: string
 readonly zIndex?: string
 readonly colors?: StarColor[]
 readonly customColors?: string[]
}

export function StarsBackground({
  count = 50, // Valor predeterminado explícito
  className = "",
  zIndex = "z-1",
  colors = ["primary", "white"],
  customColors = [],
}: StarsBackgroundProps) {
  const stars = useRandomStars(count)

  console.debug("Stars rendered:", stars.length) // Debugging

  const getStarColor = (index: number) => {
    if (colors.includes("custom") && customColors.length > 0) {
      return customColors[index % customColors.length]
    }

    const colorMap: Record<StarColor, string> = {
      primary: "bg-primary",
      secondary: "bg-secondary",
      accent: "bg-accent",
      magenta: "bg-purple-400",
      white: "bg-white",
      destructive: "bg-destructive",
      custom: "bg-primary", // Fallback
    }

    const selectedColor = colors[index % colors.length]
    return colorMap[selectedColor] || "bg-primary"
  }

  if (stars.length === 0) {
    return null // No renderizar si no hay estrellas
  }

  return (
    <div className={`fixed inset-0 ${zIndex} overflow-hidden pointer-events-none ${className}`}>
      {stars.map((star, index) => (
        <div
          key={star.id}
          className="absolute inline-flex animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `pulse ${star.duration}s infinite`,
          }}
        >
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${getStarColor(index)} opacity-75`}
          />
          <span className={`relative inline-flex h-full w-full rounded-full ${getStarColor(index)}`} />
        </div>
      ))}
    </div>
  )
}
