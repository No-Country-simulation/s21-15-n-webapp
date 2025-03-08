import { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "StartPerks - Transforma tu carrera tech",
  description: "Plataforma de desarrollo profesional para el universo tech",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  readonly children: ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <div id="app-content" className="relative z-20">
          {children}
        </div>
        <ScrollToTopButton />
      </body>
    </html>
  )
}
