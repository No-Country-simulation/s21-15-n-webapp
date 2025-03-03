"use client"

import { useEffect, useRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import Link from "next/link"
import { useNavigation } from "@/hooks/use-navigation"
import { useMobileMenu } from "@/hooks/use-mobile-menu"
import { useActiveSection } from "@/hooks/use-active-section"
import { MobileMenuOverlay } from "../layout/mobile-menu-overlay"
import { cn } from "@/lib/utils/utils"
import { createPortal } from "react-dom"

const navigationItems = [
  { label: "Inicio", href: "hero" },
  { label: "Cómo funciona", href: "como-funciona" },
  { label: "Beneficios", href: "beneficios" },
  { label: "Ranking", href: "ranking" },
  { label: "Testimonios", href: "testimonios" },
  { label: "Preguntas Frecuentes", href: "faq" },
]

export const Header = memo(function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const { isOpen, toggle } = useMobileMenu()
  const { navigateToSection, navigateToPage } = useNavigation()
  const activeSection = useActiveSection()

  const handleNavigationClick = (href: string) => {
    toggle()
    navigateToSection(href)
  }

  useEffect(() => {
    const headerElement = headerRef.current
    const headerPortal = document.getElementById("app-header")

    if (headerElement && headerPortal) {
      return () => {}
    }
  }, [])

  return (
    <>
      {/* Renderizamos el header en un portal para mantenerlo sobre el blur */}
      {createPortal(
        <header
          ref={headerRef}
          className="fixed top-0 w-full border-b border-primary/10 bg-background/80 backdrop-blur-sm z-40"
        >
          <div className="container flex h-16 items-center justify-between px-4">
            {/* Logo */}
            <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-primary/20" onClick={toggle}>
              {isOpen ? (
                <X className="h-6 w-6 transition-transform duration-200" />
              ) : (
                <Menu className="h-6 w-6 transition-transform duration-200" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>

            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="text-lg font-semibold text-white">StartPerks</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 lg:flex">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigationClick(item.href)}
                  className={cn(
                    "nav-link text-sm transition-all duration-300",
                    activeSection === item.href ? "active text-primary" : "text-gray-400 hover:text-primary",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex lg:gap-4">
                <Button
                  variant="outline"
                  className="border-primary/20 text-white hover:bg-primary/20"
                  onClick={() => navigateToPage("/register")}
                >
                  Registrarse
                </Button>
                <Button className="bg-primary text-white hover:bg-primary/90" onClick={() => navigateToPage("/login")}>
                  Iniciar sesión
                </Button>
              </div>
            </div>
          </div>
        </header>,
        document.getElementById("app-header") || document.body,
      )}

      <MobileMenuOverlay isOpen={isOpen}>
        <nav className="fixed inset-y-0 left-0 w-72 bg-background border-r border-primary/20 z-40">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between h-16 px-4 border-b border-primary/20">
              <span className="text-lg font-semibold">Menú</span>
              <Button variant="ghost" size="icon" onClick={toggle}>
                <X className="h-5 w-5" />
                <span className="sr-only">Cerrar menú</span>
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto py-4">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigationClick(item.href)}
                  className={cn(
                    "w-full px-4 py-2 text-left text-sm transition-colors",
                    activeSection === item.href
                      ? "bg-primary/20 text-primary"
                      : "text-gray-400 hover:bg-primary/10 hover:text-primary",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-primary/20">
              <div className="grid gap-2">
                <Button
                  variant="outline"
                  className="w-full border-primary/20"
                  onClick={() => navigateToPage("/register")}
                >
                  Registrarse
                </Button>
                <Button className="w-full" onClick={() => navigateToPage("/login")}>
                  Iniciar sesión
                </Button>
              </div>
            </div>
          </div>
        </nav>
      </MobileMenuOverlay>
    </>
  )
})
