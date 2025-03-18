"use client"

import { useState, type ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard/navigation/dashboard-nav"
import { TopBar } from "@/components/dashboard/navigation/top-bar"
import { MobileNav } from "@/components/dashboard/navigation/mobile-nav"

interface DashboardLayoutProps {
  readonly children: ReactNode
}
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex min-h-screen bg-space">
      {/* Barra superior solo para móvil */}
      <TopBar onMenuClick={toggleSidebar} />

      {/* Navegación móvil */}
      <MobileNav open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Barra de navegación lateral para desktop */}
      <DashboardNav isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Contenido principal */}
      <main className="flex-1 lg:ml-64">
        <div className="h-full pt-16 lg:pt-0">{children}</div>
      </main>
    </div>
  )
}
