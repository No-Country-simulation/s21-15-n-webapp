"use client"

import type React from "react"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/lib/constants/routes"
import { BadgeIcon as Certificate, Search, FileCheck, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"
import { AppLogo } from "@/components/ui/app-logo"
import { ArrowLeft } from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  description: string
  requiresAdmin?: boolean
}

// Modificar el array navItems para eliminar la opción de "Generar Certificado"
const navItems: NavItem[] = [
  {
    label: "Explorar Certificados",
    href: ROUTES.CERTIFICATES,
    icon: <Certificate className="h-5 w-5" />,
    description: "Descubre todos los certificados disponibles",
  },
  {
    label: "Certificados de Muestra",
    href: ROUTES.SAMPLE_CERTIFICATES,
    icon: <BookOpen className="h-5 w-5" />,
    description: "Ver ejemplos de certificados",
  },
  {
    label: "Verificar Certificado",
    href: `${ROUTES.VERIFY_CERTIFICATE}/demo`,
    icon: <FileCheck className="h-5 w-5" />,
    description: "Verifica la autenticidad de un certificado",
  },
  {
    label: "Buscar Certificado",
    href: `${ROUTES.CERTIFICATES}/search`,
    icon: <Search className="h-5 w-5" />,
    description: "Busca certificados por ID o nombre",
  },
]

export function CertificatesNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"

  const handleNavigation = (item: NavItem) => {
    if (item.requiresAdmin && !isAdmin) {
      toast.error("Acceso restringido. Solo administradores pueden acceder a esta sección.", {
        duration: 3000,
      })
      return false
    }

    router.push(item.href)
    return true
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Main Navbar */}
      <header className="border-b border-white/10 bg-black/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <AppLogo asLink={true} />
          <Button variant="ghost" className="text-white" onClick={() => router.push(ROUTES.HOME)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Volver al inicio</span>
          </Button>
        </div>
      </header>

      {/* Certificates Navigation */}
      <nav className="border-b border-white/10 bg-black/60 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-2 hide-scrollbar">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "default" : "ghost"}
                className={cn(
                  "flex items-center gap-2 whitespace-nowrap",
                  pathname === item.href ? "bg-primary text-white" : "text-muted-foreground hover:text-white",
                  item.requiresAdmin && !isAdmin && "opacity-60",
                )}
                onClick={() => handleNavigation(item)}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.requiresAdmin && (
                  <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">Admin</span>
                )}
              </Button>
            ))}
          </div>
        </div>
      </nav>
    </div>
  )
}

