"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { QRCodeSVG } from "qrcode.react"
import { Rocket } from "lucide-react"
import { cn } from "@/lib/utils"

interface CertificateTemplateProps {
  date: string
  title: string
  recipientName: string
  recipientRole: string
  course: string
  certifierName: string
  certifierRole: string
  certifierImage?: string
  certificateId: string
  className?: string
}

export function CertificateTemplate({
  date,
  title,
  recipientName,
  recipientRole,
  course,
  certifierName,
  certifierRole,
  certifierImage = "/placeholder.svg?height=80&width=80",
  certificateId,
  className,
}: CertificateTemplateProps) {
  const certificateRef = useRef<HTMLDivElement>(null)
  const [verificationUrl, setVerificationUrl] = useState("")
  const [scale, setScale] = useState(1)

  useEffect(() => {
    // Generate the verification URL based on the current domain
    const baseUrl = window.location.origin
    setVerificationUrl(`${baseUrl}/verify-certificate/${certificateId}`)
  }, [certificateId])

  // Add responsive scaling based on container width
  useEffect(() => {
    const handleResize = () => {
      if (certificateRef.current) {
        const containerWidth = certificateRef.current.parentElement?.clientWidth || 0
        // Base width for the certificate (desktop view)
        const baseWidth = 800
        // Calculate scale but don't make it larger than 1
        const newScale = Math.min(containerWidth / baseWidth, 1)
        setScale(newScale)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      ref={certificateRef}
      className={cn(
        "relative w-full max-w-4xl aspect-[1.414/1] bg-gradient-to-br from-[#0a0a29] to-[#1a1a4a] text-white mx-auto",
        "transform-origin-top",
        className,
      )}
      style={{
        padding: `${24 * scale}px`, // Aumentado el padding para dar más espacio desde el borde
        transformOrigin: "top center",
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -bottom-16 -left-16 w-64 h-64 border-2 border-indigo-500/30 rotate-12"></div>
        <div className="absolute -top-8 -right-8 w-48 h-48 border-2 border-indigo-500/30 -rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 border-2 border-indigo-500/30 rotate-45"></div>
      </div>

      {/* Certificate Content */}
      <div className="relative z-10 flex flex-col items-center justify-between h-full">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Rocket className={`h-${Math.max(6 * scale, 4)} w-${Math.max(6 * scale, 4)} text-indigo-400`} />
            <h1 className={`text-${Math.max(3 * scale, 2)}xl font-bold`}>StartPerks</h1>
          </div>
          <p className="text-indigo-300" style={{ fontSize: `${Math.max(14 * scale, 10)}px` }}>
            {date}
          </p>
          <h2 className="mt-4 uppercase tracking-wider" style={{ fontSize: `${Math.max(24 * scale, 16)}px` }}>
            {title}
          </h2>
        </div>

        {/* Recipient Info */}
        <div className="text-center my-8">
          <h3
            className="uppercase tracking-wide mb-2"
            style={{ fontSize: `${Math.max(36 * scale, 24)}px`, fontWeight: "bold" }}
          >
            {recipientName}
          </h3>
          <p style={{ fontSize: `${Math.max(20 * scale, 16)}px` }} className="text-indigo-400">
            {recipientRole}
          </p>
          <p className="mt-8 max-w-2xl text-center" style={{ fontSize: `${Math.max(16 * scale, 12)}px` }}>
            Por haber completado exitosamente el curso {course}, demostrando compromiso, habilidades y pasión en el
            universo tecnológico
          </p>
        </div>

        {/* Certifier Info */}
        <div className="flex items-center gap-4">
          <div
            className="relative rounded-full overflow-hidden"
            style={{
              height: `${Math.max(16 * scale, 12)}px`,
              width: `${Math.max(16 * scale, 12)}px`,
            }}
          >
            <Image src={certifierImage || "/placeholder.svg"} alt={certifierName} fill className="object-cover" />
          </div>
          <div>
            <p className="font-semibold" style={{ fontSize: `${Math.max(14 * scale, 12)}px` }}>
              {certifierName}
            </p>
            <p className="text-indigo-300" style={{ fontSize: `${Math.max(12 * scale, 10)}px` }}>
              {certifierRole}
            </p>
          </div>
        </div>

        {/* Certificate ID and QR Code - Reposicionados */}
        <div className="absolute bottom-8 right-8 flex flex-col items-end">
          <div className="bg-white p-1 rounded mb-2">
            <QRCodeSVG value={verificationUrl} size={Math.max(80 * scale, 40)} />
          </div>
          <p className="text-indigo-300" style={{ fontSize: `${Math.max(12 * scale, 10)}px` }}>
            ID: {certificateId}
          </p>
        </div>
      </div>
    </div>
  )
}

