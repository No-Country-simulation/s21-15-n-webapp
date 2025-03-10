"use client"

import { useState, useEffect } from "react"
import { getStoredUser, removeAuthCookie, removeStoredUser } from "@/config/auth/auth"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/config/constants/routes"
import type { User } from "@/config/types"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Función para verificar el estado de autenticación
    const checkAuthStatus = () => {
      const storedUser = getStoredUser()
      setUser(storedUser)
      setIsLoading(false)
    }

    // Verificar al montar el componente
    checkAuthStatus()

    // Escuchar eventos de storage para sincronizar entre pestañas
    const handleStorageChange = () => {
      checkAuthStatus()
    }

    window.addEventListener("storage", handleStorageChange)

    // Limpiar el listener al desmontar
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
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
      return ROUTES.JUNIOR
    default:
      return ROUTES.HOME
  }
}
