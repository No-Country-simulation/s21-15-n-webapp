import { memo } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin } from "lucide-react"

const footerLinks = {
  product: [
    { label: "Características", href: "#caracteristicas" },
    { label: "Precios", href: "#precios" },
    { label: "Recursos", href: "#recursos" },
  ],
  company: [
    { label: "Sobre nosotros", href: "#sobre-nosotros" },
    { label: "Blog", href: "#blog" },
    { label: "Carreras", href: "#carreras" },
  ],
  legal: [
    { label: "Términos", href: "#terminos" },
    { label: "Privacidad", href: "#privacidad" },
    { label: "Cookies", href: "#cookies" },
  ],
}

const socialLinks = [
  { icon: <Github className="h-5 w-5" />, href: "https://github.com" },
  { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com" },
  { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com" },
]

export const Footer = memo(function Footer() {
  return (
    <footer className="border-t border-purple-900/20 bg-black/50 backdrop-blur-sm">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">StartPerks</h3>
            <p className="text-gray-400 mb-4">Transformando carreras en el universo tech</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Button key={index} variant="ghost" size="icon" asChild className="text-gray-400 hover:text-white">
                  <Link href={social.href} target="_blank" rel="noopener noreferrer">
                    {social.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Producto</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Compañía</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-gray-400 hover:text-purple-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-purple-900/20 text-center text-gray-400">
          <p>© {new Date().getFullYear()} StartPerks. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
})

