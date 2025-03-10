"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getDashboardRouteByRole } from "@/hooks/use-auth"
import { getStoredUser } from "@/config/auth/auth"
import { ROUTES } from "@/config/constants/routes"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const currentUser = getStoredUser()
    if (currentUser) {
      const dashboardRoute = getDashboardRouteByRole(currentUser.role)
      router.push(dashboardRoute)
    } else {
      router.push(ROUTES.LOGIN)
    }
  }, [router])

  return (
    <div className="flex h-full items-center justify-center">
      <p className="text-lg text-white">Redirigiendo al dashboard correspondiente...</p>
    </div>
  )
}
