"use client"

import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNavigationStore } from "@/store/streams/landing.stream"
import { LANDING_CONFIG } from "@/config/constants/landing.config"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { LogOut } from "lucide-react"
import { NavItem } from "@/config/types/landing"

export function MobileNav() {
  const { isNavOpen, setNavOpen } = useNavigationStore()
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  console.debug("Mobile nav: ", user)

  const handleClose = () => {
    setNavOpen(false)
  }

  const handleLogout = () => {
    logout()
    handleClose()
  }

  return (
    <Sheet open={isNavOpen} onOpenChange={setNavOpen}>
      <SheetContent
        side="left"
        className="w-72 border-primary/20 bg-background/95 backdrop-blur-xl p-4 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500"
      >
        <h2 className="text-lg font-semibold mb-4">Menú</h2>
        <ScrollArea className="h-[calc(100vh-8rem)] pb-10">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              {LANDING_CONFIG.navigation.items.map((item: NavItem) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    handleClose()
                    const element = document.querySelector(item.href)
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-4">
              {isAuthenticated ? (
                <Button className="w-full btn-magenta flex items-center gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión
                </Button>
              ) : (
                <>
                  <Button
                    className="w-full btn-magenta"
                    onClick={() => {
                      handleClose()
                      router.push("/login")
                    }}
                  >
                    Iniciar sesión
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full btn-gradient-border"
                    onClick={() => {
                      handleClose()
                      router.push("/register")
                    }}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
