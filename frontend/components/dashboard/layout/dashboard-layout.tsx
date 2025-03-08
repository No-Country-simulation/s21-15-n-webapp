import type { ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard/navigation/dashboard-nav"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-space overflow-hidden">
      {/* Barra de navegación */}
      <DashboardNav />

      {/* Contenido principal */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}

