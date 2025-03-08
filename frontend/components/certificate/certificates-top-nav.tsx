"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/lib/constants/routes"
import { AppLogo } from "@/components/ui/app-logo"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { BadgeIcon, FileCheck, Search, BookOpen, ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import { CertificatesMobileNav } from "./certificates-mobile-nav"

export function CertificatesTopNav() {
  const pathname = usePathname() || ""
  const { user } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrolled])

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/80 shadow-md backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Menú móvil (izquierda en móvil) */}
          <div className="md:hidden">
            <CertificatesMobileNav />
          </div>

          {/* Logo y nombre (centrado en móvil, izquierda en desktop) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none flex items-center gap-2">
            <AppLogo size="md" />
          </div>

          {/* Links de navegación (solo visibles en desktop) */}
          <nav className="hidden md:flex items-center gap-4 ml-8">
            <Link
              href={ROUTES.CERTIFICATES}
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                pathname === ROUTES.CERTIFICATES
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <BadgeIcon className="mr-2 h-4 w-4" />
             Certificados
            </Link>
            <Link
              href={`${ROUTES.CERTIFICATES}/explore`}
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                pathname === `${ROUTES.CERTIFICATES}/explore`
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <FileCheck className="mr-2 h-4 w-4" />
              Cursos
            </Link>
            <Link
              href={`${ROUTES.CERTIFICATES}/sample-certificates`}
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                pathname === `${ROUTES.CERTIFICATES}/sample-certificates`
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Certificados de Muestra
            </Link>
            <Link
              href={`${ROUTES.CERTIFICATES}/search`}
              className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                pathname === `${ROUTES.CERTIFICATES}/search`
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
              }`}
            >
              <Search className="mr-2 h-4 w-4" />
              Buscar Certificados
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Link href={ROUTES.HOME}>
              <Button
                variant="ghost"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Button>
            </Link>
          </div>

          {/* Botones de acción (a la derecha)
          <div className="flex items-center gap-2">
            {user ? (
              <Link href={ROUTES.DASHBOARD}>
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href={ROUTES.LOGIN}>
                <Button variant="outline" size="sm">
                  Iniciar sesión
                </Button>
              </Link>
            )}
          </div> */}
        </div>
      </div>
    </div>
  )
}
