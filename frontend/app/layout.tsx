import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { MouseReflection } from "@/components/effects/mouse-reflection"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StartPerks - Transforma tu carrera tech",
  description: "Plataforma de desarrollo profesional para el universo tech",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <MouseReflection />
          {/* Contenedores para portales */}
          <div id="app-header" className="z-40" /> {/* Header siempre visible */}
          <div id="menu-overlay" className="z-30" /> {/* Overlay del menú */}
          <div id="app-content" className="z-20">
            {children}
          </div>{" "}
          {/* Contenido principal */}
          <ScrollToTopButton />
        </Providers>
      </body>
    </html>
  )
}

