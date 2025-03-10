"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/landing/navigation/mobile-nav"
import { NavLink } from "@/components/landing/navigation/nav-link"
import { UserMenu } from "@/components/landing/navigation/user-menu"
import { useAuth } from "@/hooks/use-auth"
import { useNavigationStore, useScrollStore } from "@/store/streams/landing.stream"
import { useActiveSection } from "@/hooks/use-active-section"
import { LANDING_CONFIG } from "@/config/constants/landing.config"
import { Menu } from "lucide-react"
import { useRouter } from "next/navigation"
import { AppLogo } from "@/components/common/ui/app-logo"
import { NavItem } from "@/config/types/landing"

export function NavBar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { activeNavItem, setNavOpen } = useNavigationStore()
  const { isScrolled, setScrollPosition } = useScrollStore()
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 })
  const navRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map())
  const router = useRouter()

  // Usar el hook para activar la sección actual
  useActiveSection()

  // Efecto para manejar el scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [setScrollPosition])

  // Efecto para actualizar la posición del indicador cuando cambia el item activo
  useEffect(() => {
    const updateIndicator = () => {
      const activeElement = itemRefs.current.get(activeNavItem)

      if (activeElement && navRef.current) {
        const navRect = navRef.current.getBoundingClientRect()
        const activeRect = activeElement.getBoundingClientRect()

        // Calcular la posición relativa al contenedor de navegación
        const left = activeRect.left - navRect.left

        setIndicatorStyle({
          left,
          width: activeRect.width,
          opacity: 1,
        })
      } else {
        // Si no hay elemento activo, ocultar el indicador
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
      }
    }

    // Actualizar inmediatamente y también en resize
    updateIndicator()
    window.addEventListener("resize", updateIndicator)

    return () => window.removeEventListener("resize", updateIndicator)
  }, [activeNavItem])

  // Obtener los elementos de navegación de forma segura
  const navigationItems = LANDING_CONFIG.navigation?.items || []

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Botón de menú móvil (solo visible en móvil) */}
        <Button variant="ghost" size="icon" className="lg:hidden text-white" onClick={() => setNavOpen(true)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menú</span>
        </Button>

        {/* Logo y nombre de la app (centrado en móvil) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0 lg:left-auto">
          <AppLogo size="md" />
        </div>

        {/* Navegación de escritorio con indicador animado */}
        <div className="hidden lg:block relative" ref={navRef}>
          <nav className="flex items-center gap-6">
            {navigationItems.map((item: NavItem ) => (
              <NavLink
                key={item.id}
                href={item.href}
                isActive={activeNavItem === item.href.replace("#", "")}
                ref={(el) => {
                  if (el) itemRefs.current.set(item.href.replace("#", ""), el)
                  else itemRefs.current.delete(item.href.replace("#", ""))
                }}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Indicador animado */}
            <div
              className="absolute -bottom-1 h-0.5 bg-gradient-to-r from-[#f80497] to-[#231c96] rounded-full transition-all duration-300 ease-in-out"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <UserMenu />
          ) : (
            <>
              {isAuthenticated ? (
                <Button className="hidden lg:inline-flex btn-magenta" onClick={logout}>
                  Cerrar sesión
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="hidden lg:inline-flex btn-gradient-border"
                    onClick={() => router.push("/register")}
                  >
                    Registrarse
                  </Button>
                  <Button className="hidden lg:inline-flex btn-magenta" onClick={() => router.push("/login")}>
                    Iniciar sesión
                  </Button>
                </>
              )}
              {/* Espacio invisible para mantener el layout en móvil */}
              <div className="w-6 lg:hidden"></div>
            </>
          )}
        </div>
      </div>

      <MobileNav />
    </header>
  )
}
