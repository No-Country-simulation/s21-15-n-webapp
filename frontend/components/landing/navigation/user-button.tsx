"use client"
import { useRouter } from "next/navigation"
import { getDashboardRouteByRole } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { User as UserType } from "@/config/types"

interface UserButtonProps {
  readonly user: UserType | null
  readonly onLogout: () => void
}

export function UserButton({ user, onLogout }: UserButtonProps) {
  const router = useRouter()

  if (!user) return null

  const dashboardRoute = getDashboardRouteByRole(user.role)
  const initials = user.name ? `${user.name.charAt(0)}${user.lastName?.charAt(0) || ""}` : "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border border-primary/20">
            <AvatarImage src={user.avatar ?? ""} alt={user.name ?? "Usuario"} />
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name} {user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push(dashboardRoute)}>Dashboard</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`${dashboardRoute}/profile`)}>Perfil</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>Cerrar sesión</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
