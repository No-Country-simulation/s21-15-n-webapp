"use client"

import { ReactNode, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, User, Settings, LogOut, Award, BookOpen, Users, Building, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { AppLogo } from "@/components/common/ui/app-logo"
import { ROUTES } from "@/config/constants/routes"
import { Sidebar } from "@/components/dashboard/navigation/sidebar"
import { MobileNav } from "@/components/dashboard/navigation/mobile-nav"
import { TopBar } from "@/components/dashboard/navigation/top-bar"

interface NavItemProps {
  readonly href: string
  readonly icon: ReactNode
  readonly label: string
  readonly isActive: boolean
}

interface DashboardNavProps {
  readonly isOpen: boolean
  readonly onClose: () => void
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
      )}
    >
      {icon}
      {label}
    </Link>
  )
}

export function DashboardNav({ isOpen, onClose }: DashboardNavProps) {
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Determinar el rol del usuario (esto es un ejemplo, ajusta según tu lógica)
  const userRole = user?.role ?? "junior"

  // Determinar qué enlaces mostrar según el rol
  const getNavLinks = () => {
    const links = [
      {
        href: ROUTES.DASHBOARD,
        icon: <Home className="h-4 w-4" />,
        label: "Inicio",
      },
    ]

    // Agregar enlaces específicos según el rol
    if (userRole === "junior") {
      links.push(
        {
          href: ROUTES.JUNIOR,
          icon: <Award className="h-4 w-4" />,
          label: "Mi Progreso",
        },
        {
          href: ROUTES.COURSE,
          icon: <BookOpen className="h-4 w-4" />,
          label: "Mis Cursos",
        },
      )
    } else if (userRole === "admin") {
      links.push({
        href: ROUTES.ADMIN,
        icon: <Settings className="h-4 w-4" />,
        label: "Administración",
      })
    } else if (userRole === "mentor") {
      links.push({
        href: ROUTES.MENTOR,
        icon: <Users className="h-4 w-4" />,
        label: "Mis Estudiantes",
      })
    } else if (userRole === "company") {
      links.push({
        href: ROUTES.COMPANY,
        icon: <Building className="h-4 w-4" />,
        label: "Mi Empresa",
      })
    }

    // Enlaces comunes para todos los roles
    links.push({
      href: ROUTES.PROFILE,
      icon: <User className="h-4 w-4" />,
      label: "Mi Perfil",
    })

    return links
  }

  const navLinks = getNavLinks()

  return (
    <>
      {/* Overlay para móvil cuando el menú está abierto */}
      {isOpen && <Button className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      {/* Barra de navegación lateral */}
      <div
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-background/95 backdrop-blur-sm border-r border-primary/10 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-primary/10 px-4">
          <AppLogo />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Cerrar menú</span>
          </Button>
        </div>

        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavItem
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  isActive={pathname === link.href}
                />
              ))}
              <button
                onClick={() => logout()}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
      <TopBar onMenuClick={() => setShowMobileMenu(true)} />
      <Sidebar />
      <MobileNav open={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </>
  )
}
