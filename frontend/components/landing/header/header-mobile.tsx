import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "./nav-items"

interface Props {
  readonly mobileMenuOpen: boolean;
  readonly setMobileMenuOpen: (open: boolean) => void;
  readonly scrollToSection: (section: string) => void;
  readonly activeSection: string;
  readonly isAuthenticated: boolean;
  readonly logout: () => void;
  readonly router: {
    push: (path: string) => void;
  };
}

function HeaderMobile({
  mobileMenuOpen,
  setMobileMenuOpen,
  scrollToSection,
  activeSection,
  isAuthenticated,
  logout,
  router,
}: Props) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/95 backdrop-blur-md pt-16">
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "w-full py-3 text-left text-lg font-medium transition-colors",
                  activeSection === item.href.replace("#", "") ? "text-primary" : "text-white hover:text-primary",
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              {isAuthenticated ? (
                <Button
                  className="w-full"
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                >
                  Cerrar sesión
                </Button>
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="w-full border-primary/20"
                    onClick={() => router.push("/register")}
                  >
                    Registrarse
                  </Button>
                  <Button className="w-full" onClick={() => router.push("/login")}>
                    Iniciar sesión
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

export default HeaderMobile
