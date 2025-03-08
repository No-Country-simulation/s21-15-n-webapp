"use client"

import { Button } from "@/components/ui/button"
import { Menu, User, LogOut, Settings } from "lucide-react"
import { MobileNav } from "./mobile-nav"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getStoredUser, removeAuthCookie, removeStoredUser } from "@/lib/utils/auth"
import { ROUTES } from "@/lib/constants/routes"
import { UI_CONFIG } from "@/lib/constants/app-config"

// Textos locales para el componente
const NAV_TEXT = {
  titles: {
    admin: "PANEL DE ADMINISTRACIÓN",
    mentor: "PANEL DE MENTORÍA",
    company: "PANEL EMPRESARIAL",
    junior: "SISTEMA DE NAVEGACIÓN ESPACIAL",
    profile: "PERFIL DE USUARIO",
  },
  perfil: "Perfil",
  configuracion: "Configuración",
  cerrarSesion: "Cerrar sesión",
}

export function DashboardNav() {
  const router = useRouter()
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [userName, setUserName] = useState("")
  const [userRole, setUserRole] = useState("")
  const [userAvatar, setUserAvatar] = useState("")

  useEffect(() => {
    const currentUser = getStoredUser()
    if (currentUser) {
      setUserName(currentUser.fullName || "")
      setUserRole(currentUser.role || "junior")
      setUserAvatar(currentUser.avatar || "")
    }
  }, [])

  const handleLogout = () => {
    removeAuthCookie()
    removeStoredUser()
    router.push(ROUTES.HOME)
  }

  const handleProfile = () => {
    router.push(ROUTES.PROFILE)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, UI_CONFIG.avatarFallbackChars)
  }

  // Determinar el título según la ruta
  const getDashboardTitle = () => {
    if (pathname?.includes(ROUTES.ADMIN)) return NAV_TEXT.titles.admin
    if (pathname?.includes(ROUTES.MENTOR)) return NAV_TEXT.titles.mentor
    if (pathname?.includes(ROUTES.COMPANY)) return NAV_TEXT.titles.company
    if (pathname?.includes(ROUTES.PROFILE)) return NAV_TEXT.titles.profile
    return NAV_TEXT.titles.junior
  }

  return (
    <>
      <header className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMobileMenu(true)}>
            <Menu className="h-5 w-5 text-white" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <h1 className="text-xl font-bold text-white">{getDashboardTitle()}</h1>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} />
                <AvatarFallback className="bg-indigo-900/30 text-indigo-400">
                  {userName ? getInitials(userName) : "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName || "Usuario"}</p>
                <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfile}>
              <User className="mr-2 h-4 w-4" />
              <span>{NAV_TEXT.perfil}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>{NAV_TEXT.configuracion}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>{NAV_TEXT.cerrarSesion}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <MobileNav open={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </>
  )
}

