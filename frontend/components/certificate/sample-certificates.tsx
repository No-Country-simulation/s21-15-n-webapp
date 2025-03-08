"use client"

import { useState } from "react"
import { CertificateTemplate } from "./certificate-template"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample certificate data
const SAMPLE_CERTIFICATES = [
  {
    date: "Enero 2025",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "DAVID CAYCEDO",
    recipientRole: "Front-End Developer",
    course: "Front-End Development",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    certificateId: "CERT-2025-001-FRO-DAVI-XYZ123",
  },
  {
    date: "Diciembre 2024",
    title: "DIPLOMA DE EXCELENCIA",
    recipientName: "MARIA RODRIGUEZ",
    recipientRole: "UX/UI Designer",
    course: "UX/UI Design Fundamentals",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    certificateId: "CERT-2024-012-UXD-MARI-ABC456",
  },
  {
    date: "Noviembre 2024",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "JUAN PEREZ",
    recipientRole: "Backend Developer",
    course: "Node.js & Express",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    certificateId: "CERT-2024-011-NOD-JUAN-DEF789",
  },
  {
    date: "Octubre 2024",
    title: "DIPLOMA DE ESPECIALIZACIÓN",
    recipientName: "CAROLINA GOMEZ",
    recipientRole: "Data Scientist",
    course: "Data Science & Machine Learning",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    certificateId: "CERT-2024-010-DAT-CARO-GHI012",
  },
  {
    date: "Septiembre 2024",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "ALEJANDRO TORRES",
    recipientRole: "DevOps Engineer",
    course: "DevOps & Cloud Engineering",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    certificateId: "CERT-2024-009-DEV-ALEJ-JKL345",
  },
  {
    date: "Agosto 2024",
    title: "DIPLOMA DE EXCELENCIA",
    recipientName: "SOFIA MARTINEZ",
    recipientRole: "Mobile Developer",
    course: "React Native Development",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    certificateId: "CERT-2024-008-REA-SOFI-MNO678",
  },
  {
    date: "Julio 2024",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "GABRIEL SANCHEZ",
    recipientRole: "Blockchain Developer",
    course: "Blockchain Fundamentals",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    certificateId: "CERT-2024-007-BLO-GABR-PQR901",
  },
  {
    date: "Junio 2024",
    title: "DIPLOMA DE ESPECIALIZACIÓN",
    recipientName: "VALENTINA LOPEZ",
    recipientRole: "AI Engineer",
    course: "Artificial Intelligence",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    certificateId: "CERT-2024-006-ART-VALE-STU234",
  },
  {
    date: "Mayo 2024",
    title: "DIPLOMA DE PARTICIPACIÓN",
    recipientName: "MATEO DIAZ",
    recipientRole: "Game Developer",
    course: "Game Development with Unity",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    certificateId: "CERT-2024-005-GAM-MATE-VWX567",
  },
  {
    date: "Abril 2024",
    title: "DIPLOMA DE EXCELENCIA",
    recipientName: "LUCIA FERNANDEZ",
    recipientRole: "Cybersecurity Specialist",
    course: "Cybersecurity Fundamentals",
    certifierName: "Sandro Borga",
    certifierRole: "Fundador experto",
    certifierImage: "/placeholder.svg?height=80&width=80",
    certificateId: "CERT-2024-004-CYB-LUCI-YZA890",
  },
]

interface SampleCertificatesProps {
  className?: string
}

export function SampleCertificates({ className }: SampleCertificatesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [zoom, setZoom] = useState(1)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? SAMPLE_CERTIFICATES.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === SAMPLE_CERTIFICATES.length - 1 ? 0 : prev + 1))
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 1.5))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 0.5))
  }

  const currentCertificate = SAMPLE_CERTIFICATES[currentIndex]

  return (
    <div className={cn("relative", className)}>
      <Card className="border-primary/20 bg-background/60 backdrop-blur-xl overflow-hidden">
        <CardContent className="p-2 sm:p-4 md:p-6">
          <div
            className="certificate-template overflow-auto"
            style={{ transform: `scale(${zoom})`, transformOrigin: "top center" }}
          >
            <CertificateTemplate
              date={currentCertificate.date}
              title={currentCertificate.title}
              recipientName={currentCertificate.recipientName}
              recipientRole={currentCertificate.recipientRole}
              course={currentCertificate.course}
              certifierName={currentCertificate.certifierName}
              certifierRole={currentCertificate.certifierRole}
              certifierImage={currentCertificate.certifierImage}
              certificateId={currentCertificate.certificateId}
            />
          </div>
        </CardContent>
      </Card>

      {/* Navigation controls */}
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-primary/20"
          onClick={handlePrevious}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Anterior</span>
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Certificado {currentIndex + 1} de {SAMPLE_CERTIFICATES.length}
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-primary/20"
          onClick={handleNext}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Siguiente</span>
        </Button>
      </div>

      {/* Zoom controls */}
      <div className="flex justify-center mt-2 gap-2">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-primary/20"
          onClick={handleZoomOut}
        >
          <ZoomOut className="h-4 w-4" />
          <span className="sr-only">Reducir</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm border-primary/20"
          onClick={handleZoomIn}
        >
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">Ampliar</span>
        </Button>
      </div>
    </div>
  )
}

