"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FilePlus } from "lucide-react"
import { ROUTES } from "@/lib/constants/routes"

export function CertificateGeneratorCard() {
  const router = useRouter()

  return (
    <Card className="border-primary/20 bg-background/60 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <FilePlus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Generador de Certificados</CardTitle>
            <CardDescription>Herramienta administrativa</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Crea y emite certificados personalizados para los usuarios de la plataforma. Esta herramienta es exclusiva
          para administradores.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full btn-magenta" onClick={() => router.push(ROUTES.GENERATE_CERTIFICATE)}>
          <FilePlus className="mr-2 h-4 w-4" />
          Generar Certificado
        </Button>
      </CardFooter>
    </Card>
  )
}

