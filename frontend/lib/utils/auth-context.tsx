"use client"

import { createContext, useContext, useState, useEffect, type ReactNode, useMemo } from "react"
import { getStoredUser, removeAuthCookie, removeStoredUser } from "@/lib/utils/auth"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/constants/routes"
import type { User } from "@/lib/types"

// Definir el tipo para el contexto
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
  navigateToDashboard: () => void
}

// Crear el contexto
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  logout: () => {},
  navigateToDashboard: () => {},
})

// Proveedor del contexto
export function AuthProvider({ children }: { readonly children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar si hay un usuario almacenado
    const storedUser = getStoredUser()
    setUser(storedUser)
    setIsLoading(false)
  }, [])

  const logout = () => {
    removeAuthCookie()
    removeStoredUser()
    setUser(null)
    router.push(ROUTES.HOME)
  }

  const navigateToDashboard = () => {
    if (!user) return

    const dashboardRoute = getDashboardRouteByRole(user.role)
    router.push(dashboardRoute)
  }

  const contextValue = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    isLoading,
    logout,
    navigateToDashboard
  }), [user, isLoading])

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook personalizado para usar el contexto
export function useAuth() {
  return useContext(AuthContext)
}

// Función auxiliar para obtener la ruta del dashboard según el rol
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
