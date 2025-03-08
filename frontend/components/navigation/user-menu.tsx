"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { User, LogOut, LayoutDashboard, Settings } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/constants/routes"
import { LANDING_TEXT } from "@/lib/constants/ui-text"
import { UI_CONFIG } from "@/lib/constants/app-config"

export function UserMenu() {
  const { user, logout, navigateToDashboard } = useAuth()
  const router = useRouter()

  if (!user) return null

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, UI_CONFIG.avatarFallbackChars)
  }

  const handleProfile = () => {
    router.push(ROUTES.PROFILE)
  }

  // Mejorar la función de logout para asegurar que funcione correctamente
  const handleLogout = () => {
    // Llamar a la función logout del hook useAuth
    logout()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.fullName} />
            <AvatarFallback className="bg-primary/20 text-primary">{getInitials(user.fullName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.fullName}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>{LANDING_TEXT.userMenu.profile}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={navigateToDashboard}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>{LANDING_TEXT.userMenu.dashboard}</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>{LANDING_TEXT.userMenu.settings}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* Modificar el DropdownMenuItem para usar handleLogout */}
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{LANDING_TEXT.userMenu.logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

