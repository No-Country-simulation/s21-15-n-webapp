"use client"

import type { ReactNode } from "react"
import { DashboardNav } from "@/components/dashboard/navigation/dashboard-nav"
import { LockOverlay } from "@/components/lock-overlay"
import { usePageVisibility } from "@/hooks/use-page-visibility"
import { useEffect, useState } from "react"
import { getStoredUser, removeAuthCookie, removeStoredUser } from "@/lib/utils/auth"
import { useRouter, usePathname } from "next/navigation"
import { ROUTES } from "@/lib/constants/routes"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function DashboardLayout({ children }: { readonly children: ReactNode }) {
  const [userPin, setUserPin] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { isVisible, wasHidden, handleUnlock } = usePageVisibility({
    initialTitle: "Dashboard - StartPerks",
  })
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuthorization = () => {
      const currentUser = getStoredUser()

      if (!currentUser) {
        router.push(ROUTES.LOGIN)
        return false
      }

      if (currentUser?.pin) {
        setUserPin(currentUser.pin)
      }

      const role = currentUser.role || "junior"
      const correctPath = `/dashboard/${role}`

      if (
        pathname.startsWith("/dashboard/") &&
        !pathname.startsWith(correctPath) &&
        pathname !== "/dashboard/profile" &&
        pathname !== ROUTES.DASHBOARD
      ) {
        removeAuthCookie()
        removeStoredUser()
        router.push("/access-denied")
        return false
      }

      if (pathname === ROUTES.DASHBOARD) {
        router.push(correctPath)
        return true
      }

      return true
    }

    const isUserAuthorized = checkAuthorization()
    setIsAuthorized(isUserAuthorized)
    setIsLoading(false)
  }, [pathname, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      {(!isVisible || wasHidden) && <LockOverlay onUnlock={handleUnlock} pinRequired={true} correctPin={userPin} />}

      <DashboardNav />

      <div className="flex-1 lg:ml-64">
        {/* Añadido mt-16 para compensar la altura del TopBar fijo */}
        <main className="h-full p-6 mt-16">{children}</main>
      </div>
    </div>
  )
}
