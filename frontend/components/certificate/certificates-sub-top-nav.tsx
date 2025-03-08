"use client"

import { useRouter } from "next/navigation"
import { AppLogo } from "@/components/ui/app-logo"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ROUTES } from "@/lib/constants/routes"

export function CertificatesSubTopNav() {
  const router = useRouter()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <AppLogo asLink={true} />
        <Button variant="ghost" className="text-white" onClick={() => router.push(ROUTES.CERTIFICATES)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Volver a certificados</span>
        </Button>
      </div>
    </header>
  )
}

