"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Download, FileImage, FileIcon as FilePdf } from "lucide-react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface DownloadOptionsProps {
  certificateId: string
}

export function DownloadOptions({ certificateId }: DownloadOptionsProps) {
  // In a real implementation, we would find the certificate element by ID
  // For this example, we'll use a ref that would be passed to the actual component
  const certificateRef = useRef<HTMLDivElement | null>(null)

  const handleDownloadImage = async () => {
    try {
      // Find the certificate element in the DOM
      const certificateElement = document.querySelector(".certificate-template") as HTMLElement
      if (!certificateElement) {
        console.error("Certificate element not found")
        return
      }

      const canvas = await html2canvas(certificateElement, {
        scale: 2, // Higher scale for better quality
        backgroundColor: null,
        logging: false,
      })

      const imageUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = imageUrl
      link.download = `certificate-${certificateId}.png`
      link.click()
    } catch (error) {
      console.error("Error downloading image:", error)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      // Find the certificate element in the DOM
      const certificateElement = document.querySelector(".certificate-template") as HTMLElement
      if (!certificateElement) {
        console.error("Certificate element not found")
        return
      }

      const canvas = await html2canvas(certificateElement, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
      })

      // Calculate dimensions to maintain aspect ratio
      const imgWidth = 297 // A4 width in landscape (mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`certificate-${certificateId}.pdf`)
    } catch (error) {
      console.error("Error downloading PDF:", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="btn-gradient-border">
          <Download className="mr-2 h-4 w-4" />
          Descargar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm border-primary/20">
        <DropdownMenuItem onClick={handleDownloadImage} className="cursor-pointer">
          <FileImage className="mr-2 h-4 w-4" />
          <span>Descargar como imagen (PNG)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDownloadPDF} className="cursor-pointer">
          <FilePdf className="mr-2 h-4 w-4" />
          <span>Descargar como PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

