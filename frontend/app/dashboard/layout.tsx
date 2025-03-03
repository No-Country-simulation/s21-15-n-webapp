"use client"

import type { ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { LockOverlay } from "@/components/lock-overlay"
import { usePageVisibility } from "@/hooks/use-page-visibility"
import { useEffect, useState } from "react"
import { getStoredUser } from "@/lib/utils/auth"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

export default function DashboardLayout({ children }: { readonly children: ReactNode }) {
  const [userPin, setUserPin] = useState("")
  const { isVisible, wasHidden, handleUnlock } = usePageVisibility({
    initialTitle: "Dashboard - StartPerks",
  })

  useEffect(() => {
    const currentUser = getStoredUser()
    if (currentUser?.pin) {
      setUserPin(currentUser.pin)
    }
  }, [])

  return (
    <div className="flex h-screen bg-background">
      {(!isVisible || wasHidden) && <LockOverlay onUnlock={handleUnlock} pinRequired={true} correctPin={userPin} />}

      <Sidebar position="left" />

      <div className="flex flex-1 flex-col">
        <DashboardNav />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      <Sidebar position="right" />
    </div>
  )
}
