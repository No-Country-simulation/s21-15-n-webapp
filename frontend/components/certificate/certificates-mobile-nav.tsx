"use client"

import type React from "react"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { ROUTES } from "@/lib/constants/routes"
import { BadgeIcon as Certificate, FileCheck, Search, BookOpen, ArrowLeft, Menu } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { toast } from "sonner"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  description: string
  requiresAdmin?: boolean
}

const navItems: NavItem[] = [
  {
    label: "Certificados",
    href: ROUTES.CERTIFICATES,
    icon: <Certificate className="h-5 w-5" />,
    description: "Descubre todos los certificados disponibles",
  },
  {
    label: "Curso",
    href: `${ROUTES.CERTIFICATES}/explore`,
    icon: <FileCheck className="h-5 w-5" />,
    description: "ver curso para certificar",
  },
  {
    label: "Certificados de Muestra",
    href: `${ROUTES.CERTIFICATES}/sample-certificates`,
    icon: <BookOpen className="h-5 w-5" />,
    description: "Ver ejemplos de certificados",
  },
  {
    label: "Buscar Certificado",
    href: `${ROUTES.CERTIFICATES}/search`,
    icon: <Search className="h-5 w-5" />,
    description: "Busca certificados por ID o nombre",
  },
]

export function CertificatesMobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname() || ""
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
    setIsOpen(false)
    return true
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menú de certificados"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-72 border-primary/20 bg-background/95 backdrop-blur-xl p-0">
          <div className="flex h-16 items-center border-b border-primary/20 px-4">
            <h2 className="text-lg font-semibold">Certificados</h2>
          </div>

          <ScrollArea className="h-[calc(100vh-4rem)] pb-10">
            <div className="p-4 space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={() => {
                  router.push(ROUTES.HOME)
                  setIsOpen(false)
                }}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al inicio
              </Button>

              <div className="space-y-1 pt-2">
                {navItems.map((item) => (
                  <Button
                    key={item.href}
                    variant={pathname === item.href ? "default" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                      item.requiresAdmin && !isAdmin && "opacity-60",
                    )}
                    onClick={() => handleNavigation(item)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                ))}
              </div>

              {/*{user && (
                <div className="pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-2">Conectado como {user.name || user.email}</div>
                  {isAdmin && (
                    <div className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full inline-block mb-2">
                      Administrador
                    </div>
                  )}
                </div>
              )}*/}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  )
}

