"use client"

import {type ChangeEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CertificateTemplate } from "@/components/certificate/certificate-template"
import { generateCertificateId } from "@/lib/certificate-service"

export default function GenerateCertificatePage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    date: "Enero 2025",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "",
    recipientRole: "",
    course: "",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
  })

  const [certificateId, setCertificateId] = useState("")
  const [previewMode, setPreviewMode] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleGeneratePreview = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate a unique certificate ID
    const newCertificateId = generateCertificateId(
      formData.course.substring(0, 3).toUpperCase(),
      formData.recipientName.replace(/\s+/g, "-").substring(0, 8).toUpperCase(),
    )

    setCertificateId(newCertificateId)
    setPreviewMode(true)
  }

  const handleReset = () => {
    setPreviewMode(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Add the CertificatesNav component */}
        {/* Añadir un indicador de que esta es una herramienta administrativa */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Generador de Certificados</h1>
          <p className="text-muted-foreground">Crea certificados personalizados para tus estudiantes o participantes</p>
          <div className="mt-2 inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm">
            Herramienta Administrativa
          </div>
        </div>
        {previewMode ? (
          <div className="space-y-8">
            <Card className="border-primary/20 bg-background/60 backdrop-blur-xl">
              <CardHeader>
                <CardTitle>Vista Previa del Certificado</CardTitle>
                <CardDescription>Así es como se verá tu certificado. ID: {certificateId}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="certificate-template">
                  <CertificateTemplate
                    date={formData.date}
                    title={formData.title}
                    recipientName={formData.recipientName}
                    recipientRole={formData.recipientRole}
                    course={formData.course}
                    certifierName={formData.certifierName}
                    certifierRole={formData.certifierRole}
                    certifierImage={formData.certifierImage}
                    certificateId={certificateId}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="btn-gradient-border" onClick={handleReset}>
                  Editar
                </Button>
                <Button className="btn-magenta">Guardar y Publicar</Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <Card className="border-primary/20 bg-background/60 backdrop-blur-xl">
            <form onSubmit={handleGeneratePreview}>
              <CardHeader>
                <CardTitle>Información del Certificado</CardTitle>
                <CardDescription>Completa los datos para generar un certificado personalizado</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Fecha</Label>
                    <Input
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="border-primary/20 bg-primary/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del Certificado</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="border-primary/20 bg-primary/10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipientName">Nombre del Recipiente</Label>
                  <Input
                    id="recipientName"
                    name="recipientName"
                    value={formData.recipientName}
                    onChange={handleInputChange}
                    className="border-primary/20 bg-primary/10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipientRole">Rol del Recipiente</Label>
                  <Input
                    id="recipientRole"
                    name="recipientRole"
                    value={formData.recipientRole}
                    onChange={handleInputChange}
                    className="border-primary/20 bg-primary/10"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course">Curso Completado</Label>
                  <Input
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="border-primary/20 bg-primary/10"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="certifierName">Nombre del Certificador</Label>
                    <Input
                      id="certifierName"
                      name="certifierName"
                      value={formData.certifierName}
                      onChange={handleInputChange}
                      className="border-primary/20 bg-primary/10"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifierRole">Rol del Certificador</Label>
                    <Input
                      id="certifierRole"
                      name="certifierRole"
                      value={formData.certifierRole}
                      onChange={handleInputChange}
                      className="border-primary/20 bg-primary/10"
                      required
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="btn-magenta">
                  Generar Vista Previa
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}
      </main>
    </div>
  )
}

