"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CertificateTemplate } from "@/components/certificate/certificate-template"
import { ShareCertificate } from "@/components/certificate/share-certificate"
import { DownloadOptions } from "@/components/certificate/download-options"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { verifyCertificate } from "@/lib/certificate-service"
import { ROUTES } from "@/lib/constants/routes"
import { StarsBackground } from "@/components/ui/stars-background"

export default function VerifyCertificatePage() {
  const params = useParams()
  const router = useRouter()
  const certificateId = params.id as string

  const [isLoading, setIsLoading] = useState(true)
  const [isValid, setIsValid] = useState(false)
  const [certificateData, setCertificateData] = useState<any>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCertificateData = async () => {
      try {
        setIsLoading(true)
        // In a real app, this would be an API call to verify the certificate
        const result = await verifyCertificate(certificateId)

        if (result.valid) {
          setIsValid(true)
          setCertificateData(result.data)
        } else {
          setIsValid(false)
          setError(result.error || "Certificado no válido o expirado")
        }
      } catch (err) {
        setIsValid(false)
        setError("Error al verificar el certificado")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (certificateId) {
      fetchCertificateData()
    }
  }, [certificateId])

  return (
    <div className="min-h-screen bg-background">
      {/* Stars Background */}
      <StarsBackground />

      {/* Main Content */}
      <main className="container mx-auto pt-4 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Verificación de Certificado</h1>
          <p className="text-muted-foreground">Verifica la autenticidad de un certificado emitido por StartPerks</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground">Verificando certificado...</p>
          </div>
        ) : isValid && certificateData ? (
          <div className="space-y-8">
            <Card className="border-primary/20 bg-background/60 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-center gap-4">
                <CheckCircle className="h-8 w-8 text-green-500" />
                <div>
                  <CardTitle>Certificado Válido</CardTitle>
                  <CardDescription>Este certificado ha sido emitido por StartPerks y es auténtico</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6 certificate-template">
                  <CertificateTemplate
                    date={certificateData.date}
                    title={certificateData.title}
                    recipientName={certificateData.recipientName}
                    recipientRole={certificateData.recipientRole}
                    course={certificateData.course}
                    certifierName={certificateData.certifierName}
                    certifierRole={certificateData.certifierRole}
                    certifierImage={certificateData.certifierImage}
                    certificateId={certificateData.certificateId}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <ShareCertificate certificateId={certificateId} />
                <DownloadOptions certificateId={certificateId} />
              </CardFooter>
            </Card>
          </div>
        ) : (
          <Card className="border-destructive/20 bg-background/60 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center gap-4">
              <XCircle className="h-8 w-8 text-destructive" />
              <div>
                <CardTitle>Certificado No Válido</CardTitle>
                <CardDescription>{error}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                El certificado con ID <span className="font-mono">{certificateId}</span> no pudo ser verificado. Esto
                puede deberse a que el certificado no existe, ha sido revocado o la información proporcionada es
                incorrecta.
              </p>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="btn-gradient-border"
                onClick={() => router.push(ROUTES.CERTIFICATES)}
              >
                Ver certificados disponibles
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  )
}
