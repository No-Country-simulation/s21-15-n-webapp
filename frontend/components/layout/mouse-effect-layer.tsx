"use client"

import { useMouseEffect } from "@/hooks/use-mouse-effect"

export function MouseEffectLayer() {
  const { mousePosition, isMounted } = useMouseEffect({ intensity: 1.2 })

  if (!isMounted) return null

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.2),transparent_50%)]"
        style={{
          transform: `translate(${mousePosition.x - 50}%, ${mousePosition.y - 50}%)`,
        }}
      />
    </div>
  )
}

