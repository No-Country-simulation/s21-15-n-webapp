"use client"

import { useRandomStars } from "@/hooks/use-random-stars"
import { UI_CONFIG } from "@/lib/constants/app-config"

interface StarsBackgroundProps {
  count?: number
  className?: string
  zIndex?: string
}

export function StarsBackground({
  count = UI_CONFIG.maxStars,
  className = "",
  zIndex = "-z-10",
}: StarsBackgroundProps) {
  const stars = useRandomStars(count)

  return (
    <div className={`fixed inset-0 ${zIndex} overflow-hidden ${className}`}>
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute inline-flex animate-pulse ${star.color}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animation: `pulse ${star.duration}s infinite`,
          }}
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
          <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
        </div>
      ))}
    </div>
  )
}

