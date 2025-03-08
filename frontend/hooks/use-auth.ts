"use client"

import { useState, useEffect } from "react"
import { getStoredUser, removeAuthCookie, removeStoredUser } from "@/lib/utils/auth"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/constants/routes"
import type { User } from "@/lib/types"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar si hay un usuario almacenado
    const storedUser = getStoredUser()
    setUser(storedUser)
    setIsLoading(false)
  }, [])

  // Mejorar la función logout para asegurar que se eliminen todas las cookies
  const logout = () => {
    // Eliminar cookies y datos de usuario
    removeAuthCookie() // Esto ahora también elimina la cookie de rol
    removeStoredUser()

    // Actualizar el estado local inmediatamente
    setUser(null)

    // Redirigir a la página principal
    router.push(ROUTES.HOME)
  }

  const navigateToDashboard = () => {
    if (!user) return

    const dashboardRoute = getDashboardRouteByRole(user.role)
    router.push(dashboardRoute)
  }

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
    navigateToDashboard,
  }
}

export function getDashboardRouteByRole(role: User["role"]): string {
  switch (role) {
    case "admin":
      return ROUTES.ADMIN
    case "mentor":
      return ROUTES.MENTOR
    case "company":
      return ROUTES.COMPANY
    case "junior":
    default:
      return ROUTES.JUNIOR
  }
}

