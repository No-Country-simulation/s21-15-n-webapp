"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Trophy, Rocket, Zap, MessageSquare, User, LogOut } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { AppLogo } from "@/components/ui/app-logo"

const NAV_ITEMS = [
  { icon: <Home className="h-5 w-5" />, label: "Inicio", href: "/dashboard/junior" },
  { icon: <Trophy className="h-5 w-5" />, label: "Ranking", href: "/dashboard/ranking" },
  { icon: <Rocket className="h-5 w-5" />, label: "Lorem", href: "/dashboard/lorem1" },
  { icon: <Zap className="h-5 w-5" />, label: "Lorem", href: "/dashboard/lorem2" },
  { icon: <MessageSquare className="h-5 w-5" />, label: "Lorem", href: "/dashboard/lorem3" },
  { icon: <User className="h-5 w-5" />, label: "Perfil", href: "/dashboard/profile" },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="fixed left-0 top-0 hidden h-screen w-64 border-r border-primary/20 bg-[#0a0b1e] lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-primary/20 px-4">
          <AppLogo />
        </div>

        <ScrollArea className="flex-1 px-2 py-4">
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-indigo-900/30 text-indigo-400"
                    : "text-gray-400 hover:bg-indigo-900/20 hover:text-indigo-400",
                )}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="border-t border-primary/20 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-indigo-900/20 hover:text-indigo-400"
          >
            <LogOut className="h-5 w-5" />
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  )
}

