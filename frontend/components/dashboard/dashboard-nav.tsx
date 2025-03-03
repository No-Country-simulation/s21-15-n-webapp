"use client"

import { Button } from "@/components/ui/button"
import { Menu, User, LogOut } from "lucide-react"
import { MobileNav } from "./mobile-nav"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function DashboardNav() {
  const router = useRouter()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? "{}")
    if (currentUser && currentUser.name) {
      setUserName(currentUser.name)
    }
  }, [])

  const handleLogout = () => {
    Cookies.remove("auth")
    localStorage.removeItem("currentUser")
    router.push("/") // Redirige a la landing page
  }

  const handleProfile = () => {
    router.push("/dashboard/profile")
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-primary/20 bg-background/60 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMobileMenu(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-lg font-bold">SPACE NAVIGATION SYSTEM</h1>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {userName ? getInitials(userName) : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName || "Usuario"}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleProfile}>
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <MobileNav open={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </>
  )
}
