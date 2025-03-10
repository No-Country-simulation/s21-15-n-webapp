import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin } from "lucide-react"
import { LANDING_CONFIG } from "@/config/constants/landing.config"
import { AppLogo } from "@/components/common/ui/app-logo" // Import the AppLogo component

export function Footer() {
  // Función para obtener el ícono correcto basado en el nombre
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Github":
        return <Github className="h-5 w-5" />
      case "Twitter":
        return <Twitter className="h-5 w-5" />
      case "Linkedin":
        return <Linkedin className="h-5 w-5" />
      default:
        return <Github className="h-5 w-5" />
    }
  }

  return (
    <footer className="border-t border-white/10 bg-background backdrop-blur-sm">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* Replace the manual logo with the AppLogo component */}
            <div className="mb-4">
              <AppLogo size="md" />
            </div>
            <p className="text-muted-foreground mb-4">Transformando carreras en el universo tech</p>
            <div className="flex space-x-4">
              {LANDING_CONFIG.footer.social.map((social) => (
                <Button
                  key={social.id}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-muted-foreground hover:text-white"
                >
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    {getIcon(social.icon)}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {LANDING_CONFIG.footer.sections.map((section) => (
            <div key={section.id}>
              <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Nueva sección para Recursos */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Recursos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/certificates" className="text-muted-foreground hover:text-primary transition-colors">
                  Certificados
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Tutoriales
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentación
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} StartPerks. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
