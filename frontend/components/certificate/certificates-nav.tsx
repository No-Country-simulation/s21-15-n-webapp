"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ROUTES } from "@/lib/constants/routes"
import { BadgeIcon as Certificate, Search, FilePlus, BookOpen, Menu, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AppLogo } from "@/components/ui/app-logo"
import { useAuth } from "@/hooks/use-auth"
import { ArrowLeft } from "lucide-react"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  description: string
  requiresAdmin?: boolean
}

const navItems: NavItem[] = [
  {
    label: "Explorar Certificados",
    href: ROUTES.CERTIFICATES,
    icon: <Certificate className="h-5 w-5" />,
    description: "Descubre todos los certificados disponibles",
  },
  {
    label: "Certificados de Muestra",
    href:  `${ROUTES.CERTIFICATES}/sample-certificates`,
    icon: <BookOpen className="h-5 w-5" />,
    description: "Ver ejemplos de certificados",
  },
  {
    label: "Buscar Certificado",
    href: `${ROUTES.CERTIFICATES}/search`,
    icon: <Search className="h-5 w-5" />,
    description: "Busca certificados por ID o nombre",
  },
  {
    label: "Generar Certificado",
    href: ROUTES.GENERATE_CERTIFICATE,
    icon: <FilePlus className="h-5 w-5" />,
    description: "Crea un nuevo certificado personalizado",
    requiresAdmin: true,
  },
]

export function CertificatesNav() {
  const pathname = usePathname() || ""
  const router = useRouter()
  const { user } = useAuth()
  const [activeItem, setActiveItem] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showUnauthorizedAlert, setShowUnauthorizedAlert] = useState(false)

  const isAdmin = user?.role === "admin"

  useEffect(() => {
    if (!pathname) return

    // Find the most specific matching route
    const matchingItem = navItems
      .filter((item) => pathname.startsWith(item.href))
      .sort((a, b) => b.href.length - a.href.length)[0]

    setActiveItem(matchingItem?.href || "")

    // Check if current path requires admin and user is not admin
    const currentNavItem = navItems.find((item) => pathname.startsWith(item.href))
    if (currentNavItem?.requiresAdmin && !isAdmin) {
      setShowUnauthorizedAlert(true)
    }
  }, [pathname, isAdmin])

  const handleNavigation = (item: NavItem) => {
    if (item.requiresAdmin && !isAdmin) {
      toast.error("Acceso restringido. Solo administradores pueden acceder a esta sección.", {
        duration: 3000,
      })
      setShowUnauthorizedAlert(true)
      return false
    }

    router.push(item.href)
    setMobileMenuOpen(false)
    return true
  }

  return (
    <div className="mb-12 border-b border-white/10 pb-4 w-full">
      {/* Mobile Menu Button - Only visible on small screens */}
      <AppLogo asLink={true} />
      <Button variant="ghost" className="text-white" onClick={() => router.push(ROUTES.CERTIFICATES)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Volver a certificados</span>
      </Button>
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <h3 className="text-sm font-medium text-white">Navegación de Certificados</h3>
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden text-white">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 border-primary/20 bg-background/95 backdrop-blur-xl p-0">
            <div className="flex h-16 items-center border-b border-primary/20 px-4">
              <h2 className="text-lg font-semibold">Certificados</h2>
            </div>
            <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
              <div className="p-4">
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      variant="ghost"
                      className={cn(
                        "flex items-start gap-3 rounded-md px-3 py-2 text-sm transition-colors w-full justify-start",
                        activeItem === item.href
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-primary/10 hover:text-white",
                        item.requiresAdmin && !isAdmin && "opacity-60",
                      )}
                      onClick={() => handleNavigation(item)}
                    >
                      <span className="mt-0.5">{item.icon}</span>
                      <div className="flex flex-col items-start">
                        <span className="flex items-center gap-1">
                          {item.label}
                          {item.requiresAdmin && (
                            <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">Admin</span>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation - Hidden on small screens, visible on larger screens */}
      <nav className="hidden lg:flex flex-nowrap gap-4 overflow-x-auto pb-2">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "group relative flex flex-col items-center rounded-lg px-4 py-3 transition-colors whitespace-nowrap h-auto",
              activeItem === item.href
                ? "bg-primary/20 text-primary"
                : "hover:bg-primary/10 text-muted-foreground hover:text-white",
              item.requiresAdmin && !isAdmin && "opacity-60",
            )}
            onClick={() => handleNavigation(item)}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="font-medium flex items-center gap-1">
                {item.label}
                {item.requiresAdmin && (
                  <span className="text-xs bg-primary/20 text-primary px-1.5 py-0.5 rounded-full">Admin</span>
                )}
              </span>
            </div>
            <span className="mt-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
              {item.description}
            </span>
            {activeItem === item.href && <span className="absolute -bottom-[17px] left-0 right-0 h-[3px] bg-primary" />}
          </Button>
        ))}
      </nav>

      {/* Mobile Navigation - Visible on small screens, hidden on larger screens */}
      <nav className="flex lg:hidden flex-nowrap gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {navItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 transition-colors whitespace-nowrap flex-shrink-0 h-auto",
              activeItem === item.href
                ? "bg-primary/20 text-primary"
                : "hover:bg-primary/10 text-muted-foreground hover:text-white",
              item.requiresAdmin && !isAdmin && "opacity-60",
            )}
            onClick={() => handleNavigation(item)}
          >
            {item.icon}
            <span className="text-sm">{item.label}</span>
            {item.requiresAdmin && (
              <span className="text-xs bg-primary/20 text-primary px-1 py-0.5 rounded-full">Admin</span>
            )}
          </Button>
        ))}
      </nav>

      {/* Unauthorized Access Alert */}
      <AlertDialog open={showUnauthorizedAlert} onOpenChange={setShowUnauthorizedAlert}>
        <AlertDialogContent className="bg-background border-destructive/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Acceso Restringido
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta sección requiere permisos de administrador. Solo los administradores pueden acceder a la generación
              de certificados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                router.push(ROUTES.HOME)
                setShowUnauthorizedAlert(false)
              }}
              className="bg-primary hover:bg-primary/90"
            >
              Volver al inicio
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

