"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { useAvatarMock } from "@/hooks/use-avatar-mock"
import { ROUTES } from "@/config/constants/routes"
import { LANDING_TEXT } from "@/config/constants/ui-text"
import { useNameInitials } from "@/hooks/use-name-initials"

// Importar el hook useAvatarMock

export function UserMenu() {
  const { user, logout, navigateToDashboard } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Dentro de la función UserMenu, añadir:
  const avatarMock = useAvatarMock()

  if (!user) return null

  // Función mejorada para obtener iniciales
  const Initials = (name: string) => {
    const initialsName=useNameInitials(name)
    return initialsName

  }

  const handleProfile = () => {
    router.push(ROUTES.PROFILE)
    setOpen(false)
  }

  const handleLogout = () => {
    logout()
    router.push(ROUTES.HOME)
    setOpen(false)
  }

  const handleDashboard = () => {
    navigateToDashboard()
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full" asChild>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8">
            {/* Modificar la línea del AvatarImage para usar el avatarMock cuando no hay avatar: */}
            <AvatarImage src={user.avatar ?? avatarMock} alt={`${user.name} ${user.lastName}`} />
            <AvatarFallback className="bg-primary/20 text-primary">{Initials(`${user.name} ${user.lastName}`) }</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </Button>

      <DropdownMenuContent className="w-56 shadow-lg" align="end" sideOffset={8}>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">`${user.name} ${user.lastName}`</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile}>
          <User className="mr-2 h-4 w-4" />
          <span>{LANDING_TEXT.userMenu.profile}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDashboard}>
          <LayoutDashboard className="mr-2 h-4 w-4" />
          <span>{LANDING_TEXT.userMenu.dashboard}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setOpen(false)
            router.push(ROUTES.SETTINGS)
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>{LANDING_TEXT.userMenu.settings}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{LANDING_TEXT.userMenu.logout}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
