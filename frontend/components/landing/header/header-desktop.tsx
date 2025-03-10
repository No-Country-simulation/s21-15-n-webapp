import { Button } from "@/components/ui/button"

interface Props {
  readonly isScrolled: boolean;
  readonly scrollToSection: (section: string) => void;
  readonly activeSection: string;
  readonly isAuthenticated: boolean;
  readonly logout: () => void;
  readonly router: {
    push: (path: string) => void;
  };
}
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { NAV_ITEMS } from "./nav-items"

function HeaderDesktop({
  isScrolled,
  scrollToSection,
  activeSection,
  isAuthenticated,
  logout,
  router,
}: Props) {
  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-semibold text-white">StartPerks</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const activeSectionId = item.href.replace("#", "")
            return (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "text-sm transition-colors relative",
                  activeSection === activeSectionId
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-white",
                )}
              >
                {item.label}
                {activeSection === activeSectionId && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex lg:gap-4">
            {isAuthenticated ? (
              <Button className="bg-primary text-white hover:bg-primary/90" onClick={logout}>
                Cerrar sesión
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="border-primary/20 text-white hover:bg-primary/20"
                  onClick={() => router.push("/register")}
                >
                  Registrarse
                </Button>
                <Button className="bg-primary text-white hover:bg-primary/90" onClick={() => router.push("/login")}>
                  Iniciar sesión
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderDesktop
