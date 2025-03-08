"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useActiveSection } from "@/hooks/use-active-section"

const NAV_ITEMS = [
  { label: "Inicio", href: "#hero" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Ranking", href: "#ranking" },
  { label: "Conquistas", href: "#conquistas" },
  { label: "Testimonios", href: "#testimonios" },
  { label: "FAQ", href: "#faq" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const activeSection = useActiveSection()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
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
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  "text-sm transition-colors relative",
                  activeSection === item.href.replace("#", "")
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-white",
                )}
              >
                {item.label}
                {activeSection === item.href.replace("#", "") && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex lg:gap-4">
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
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
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
              <Button variant="outline" className="w-full border-primary/20" onClick={() => router.push("/register")}>
                Registrarse
              </Button>
              <Button className="w-full" onClick={() => router.push("/login")}>
                Iniciar sesión
              </Button>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}

