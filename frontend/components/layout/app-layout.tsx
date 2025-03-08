import type { ReactNode } from "react"
import { MouseEffectLayer } from "./mouse-effect-layer"

interface AppLayoutProps {
  children: ReactNode
  showMouseEffect?: boolean
}

export function AppLayout({ children, showMouseEffect = true }: AppLayoutProps) {
  return (
    <div className="relative min-h-screen bg-background">
      {showMouseEffect && <MouseEffectLayer />}
      <div id="main-content" className="relative z-10">
        {children}
      </div>
    </div>
  )
}

