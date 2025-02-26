import { Menu, X, Sparkles } from "lucide-react"
import { Link, useLocation } from "react-router-dom";
import { memo, useState } from "react"
import { useBlurEffect } from "../../../../hooks"
import { Button } from "../../../../components/ui/button"

const navigationItems = [
  { label: "Inicio", href: "/" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Ranking", href: "#ranking" },
  { label: "Integración", href: "#integracion" },
  { label: "Testimonios", href: "#testimonios" },
]

export const Header = memo(function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  // Usar el hook personalizado para el efecto blur
  useBlurEffect(isOpen)

  const handleNavigationClick = () => {
    setIsOpen(false)
  }

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === href
    }
    return pathname.startsWith(href) || pathname.endsWith(href.replace("#", ""))
  }

  return (
    <header className="fixed top-0 w-full border-b border-gray-800/10 bg-black/50 backdrop-blur-sm z-40">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-600/20">
            <Sparkles className="h-4 w-4 text-purple-400" />
          </div>
          <span className="text-lg font-semibold text-white">StartPerks</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-sm transition-colors hover:text-emerald-400 ${
                isActiveLink(item.href) ? "text-emerald-400" : "text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons and Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex lg:gap-4">
            <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              Registrarse
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400">
              Iniciar sesión
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-gray-800"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 transition-transform duration-200" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-200" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-99 lg:hidden">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/80" onClick={() => setIsOpen(false)} />

          {/* Menu Content */}
          <div className="fixed right-0 top-0 h-full w-full max-w-[300px] bg-[#0A0A0A] shadow-xl">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-gray-800"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="flex flex-col space-y-1 p-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`rounded-md px-4 py-3 text-sm transition-colors ${
                    isActiveLink(item.href)
                      ? "bg-gray-800 text-emerald-400"
                      : "text-white hover:bg-gray-800 hover:text-emerald-400"
                  }`}
                  onClick={handleNavigationClick}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Buttons */}
              <div className="mt-4 space-y-2 pt-4 border-t border-gray-800">
                <Button variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">
                  Registrarse
                </Button>
                <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400">
                  Iniciar sesión
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
})
