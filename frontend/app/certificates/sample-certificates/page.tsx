"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Share2 } from "lucide-react"
import { SampleCertificates } from "@/components/certificate/sample-certificates"
import { ROUTES } from "@/lib/constants/routes"
import { StarsBackground } from "@/components/ui/stars-background"

export default function SampleCertificatesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      {/* Stars Background */}
      <StarsBackground />
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-36 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Certificados de Muestra</h1>
          <p className="text-muted-foreground">Explora ejemplos de certificados emitidos por StartPerks</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <SampleCertificates className="max-w-4xl mx-auto" />
          </div>

          <div className="space-y-6">
            <Card className="border-primary/20 bg-background/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Certificados StartPerks</CardTitle>
                <CardDescription>
                  Nuestros certificados son reconocidos en la industria y verificables digitalmente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Cada certificado incluye:</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">•</span>
                    <span>Identificador único para verificación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">•</span>
                    <span>Código QR para verificación rápida</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">•</span>
                    <span>Información detallada del curso completado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-medium">•</span>
                    <span>Firma digital del certificador</span>
                  </li>
                </ul>

                <div className="flex flex-col gap-2 pt-4">
                  <Button className="w-full btn-magenta">
                    <Download className="mr-2 h-4 w-4" />
                    Descargar ejemplo
                  </Button>
                  <Button variant="outline" className="w-full btn-gradient-border">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartir
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-background/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>¿Cómo verificar un certificado?</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-2 text-muted-foreground list-decimal pl-4">
                  <li>Escanea el código QR del certificado</li>
                  <li>Ingresa el ID del certificado en nuestra página de verificación</li>
                  <li>Verifica que los datos coincidan con el certificado físico</li>
                </ol>
                <Button
                  className="w-full mt-4"
                  variant="outline"
                  onClick={() => router.push(`${ROUTES.CERTIFICATES}/verify/CERT-2024-012-UXD-MARI-ABC456`)}
                >
                  Probar verificación
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
