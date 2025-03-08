"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getStoredUser } from "@/lib/utils/auth"
import { ROUTES } from "@/lib/constants/routes"
import { getDashboardRouteByRole } from "@/hooks/use-auth"

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

