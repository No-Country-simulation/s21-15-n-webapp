"use client"

import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/constants/routes"
import { CertificatesSubTopNav } from "@/components/certificate/certificates-sub-top-nav"
import { StarsBackground } from "@/components/ui/stars-background"
import { type ReactNode, useEffect } from "react"
import { useAuth } from "@/hooks/use-auth"

interface GenerateCertificateLayoutProps {
  children: ReactNode
}

export default function GenerateCertificateLayout({ children }: Readonly<GenerateCertificateLayoutProps>) {
  const router = useRouter()
  const { user } = useAuth()
  const isAdmin = user?.role === "admin"

  useEffect(() => {
    // If user is not admin, redirect immediately to certificates page
    if (!isAdmin) {
      router.push(ROUTES.CERTIFICATES)
    }
  }, [isAdmin, router])

  return (
    <div className="min-h-screen bg-background">
      {/* Stars Background */}
      <StarsBackground />
      {/* Sub Nav Bar */}
      <CertificatesSubTopNav />
      {isAdmin ? (
        <main className="container mx-auto px-4 pt-24 pb-16">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Generador de Certificados</h1>
            <p className="text-muted-foreground">
              Crea certificados personalizados para tus estudiantes o participantes
            </p>
          </div>
          {children}
        </main>
      ) : null}
    </div>
  )
}
