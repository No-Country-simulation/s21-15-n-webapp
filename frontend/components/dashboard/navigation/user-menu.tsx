"use client"

import { useRouter } from "next/navigation"
import { User, Settings, LogOut } from "lucide-react"
import { useAvatarMock } from "@/hooks/use-avatar-mock"
import { useAuth } from "@/hooks/use-auth"
import { NAVIGATION_TEXT } from "@/config/constants/ui-text"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useNameInitials } from "@/hooks/use-name-initials"
// Importar el hook useAvatarMock

export function UserMenu() {
  const router = useRouter()
  const { user, logout } = useAuth()

  // Dentro de la función UserMenu, añadir:
  const avatarMock = useAvatarMock()

  if (!user) return null

  const Initials = (name: string) => {
    const initialsName = useNameInitials(name)
    return initialsName
  }

  return (
    <DropdownMenu>
      <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full" asChild>
        <DropdownMenuTrigger>
          <Avatar className="h-8 w-8">
            {/* Modificar la línea del AvatarImage para usar el avatarMock cuando no hay avatar: */}
            <AvatarImage src={user.avatar ?? avatarMock} alt={`Avatar de ${user.name} ${user.lastName}`} />
            <AvatarFallback className="bg-primary/20 text-primary">{Initials(`${user.name} ${user.lastName}`)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-text-primary">{`${user.name} ${user.lastName}`}</p>
            <p className="text-xs text-text-secondary capitalize">{user.role}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>
          <User className="mr-2 h-4 w-4" />
          <span>{NAVIGATION_TEXT.perfil}</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>{NAVIGATION_TEXT.configuracion}</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{NAVIGATION_TEXT.cerrarSesion}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
