"use client"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Trophy, Rocket, Zap, MessageSquare, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAVIGATION_TEXT } from "@/lib/constants/ui-text"
import { useAuth } from "@/hooks/use-auth"

// Elementos de navegación
const NAV_ITEMS = [
  { icon: <Home className="h-5 w-5" />, label: NAVIGATION_TEXT.inicio, href: "/dashboard/junior" },
  { icon: <Trophy className="h-5 w-5" />, label: NAVIGATION_TEXT.ranking, href: "/dashboard/ranking" },
  { icon: <Rocket className="h-5 w-5" />, label: NAVIGATION_TEXT.lorem, href: "/dashboard/lorem1" },
  { icon: <Zap className="h-5 w-5" />, label: NAVIGATION_TEXT.lorem, href: "/dashboard/lorem2" },
  { icon: <MessageSquare className="h-5 w-5" />, label: NAVIGATION_TEXT.lorem, href: "/dashboard/lorem3" },
  { icon: <User className="h-5 w-5" />, label: NAVIGATION_TEXT.perfil, href: "/dashboard/profile" },
]

interface MobileNavProps {
  open: boolean
  onClose: () => void
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
    onClose()
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent
        side="left"
        className="w-72 border-accent-primary/20 bg-background-secondary/95 backdrop-blur-xl p-0 flex flex-col"
      >
        <div className="flex h-16 items-center justify-between border-b border-accent-primary/20 px-4">
          <h2 className="text-lg font-semibold text-text-primary">{NAVIGATION_TEXT.navegacion}</h2>
          {/* Eliminado el botón de cierre personalizado, usando solo el nativo de SheetContent */}
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <nav className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full",
                    pathname === item.href
                      ? "bg-accent-primary/20 text-accent-primary"
                      : "text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary",
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </ScrollArea>

        {/* Footer con botón de cerrar sesión */}
        <div className="mt-auto border-t border-accent-primary/20 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full text-text-secondary hover:bg-accent-primary/10 hover:text-accent-primary"
          >
            <LogOut className="h-5 w-5" />
            {NAVIGATION_TEXT.cerrarSesion}
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

