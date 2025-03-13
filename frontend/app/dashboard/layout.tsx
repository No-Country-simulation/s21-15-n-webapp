"use client"

import { type  ReactNode, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { usePageVisibility } from "@/hooks/use-page-visibility"
import { getStoredUser, removeAuthCookie, removeStoredUser } from "@/config/auth/auth"
import { ROUTES } from "@/config/constants/routes"
import { LockOverlay } from "@/components/common/ui/lock-overlay"
import { LoadingSpinner } from "@/components/common/ui/loading-spinner"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { DashboardNav } from "@/components/dashboard/navigation/dashboard-nav"
import { User } from "@/config/types"

function DashboardLayoutInner({ children }: { readonly children: ReactNode }) {
  const [userPin, setUserPin] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const { isVisible, wasHidden, handleUnlock } = usePageVisibility({
    initialTitle: "Dashboard - StartPerks",
  })
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const getCurrentUser = () => {
      const currentUser = getStoredUser()
      if (!currentUser) {
        router.push(ROUTES.LOGIN)
        return null
      }
      return currentUser
    }

    const handleUserPin = (currentUser: User) => {
      if (currentUser?.pin) {
        setUserPin(currentUser.pin)
      }
    }

    const getCorrectPath = (role: string) => `/dashboard/${role}`

    const isInvalidPath = (correctPath: string) => {
      return (
        pathname.startsWith("/dashboard/") &&
        !pathname.startsWith(correctPath) &&
        pathname !== "/dashboard/profile" &&
        pathname !== "/dashboard/messager" &&
        pathname !== ROUTES.DASHBOARD
      )
    }

    const checkAuthorization = () => {
      const currentUser = getCurrentUser()
      if (!currentUser) return false

      handleUserPin(currentUser)

      const role = currentUser.role || "junior"
      const correctPath = getCorrectPath(role)

      if (isInvalidPath(correctPath)) {
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
      <DashboardNav isOpen={true} onClose={() => {}} />
      <div className="flex-1">
        <main className="h-full">{children}</main>
      </div>
    </div>
  )
}

export default function DashboardRootLayout({
  children,
}: {
  readonly children: ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-[#020817] text-white">
      <StarsBackground />
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </div>
  )
}
