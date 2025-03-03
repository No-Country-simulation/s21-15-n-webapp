"use client"

import { SystemMetrics } from "@/components/dashboard/system-metrics"
import { NavigationControls } from "@/components/dashboard/navigation-controls"
import { OrbitalControls } from "@/components/dashboard/orbital-controls"
import { SystemControls } from "@/components/dashboard/system-controls"
import { TimeStatus } from "@/components/dashboard/time-status"
import { SystemStatus } from "@/components/dashboard/system-status"
import { useRandomStars } from "@/hooks/use-random-stars"
export default function DashboardPage() {
  const stars = useRandomStars(50)

  return (
    <>
      {/* Stars Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
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
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex h-full w-full rounded-full bg-purple-500" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NavigationControls />
        <SystemMetrics />
        <OrbitalControls />
        <SystemControls />
        <TimeStatus />
        <SystemStatus />
      </div>
    </>
  )
}
