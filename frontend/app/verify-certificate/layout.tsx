"use client"

import { CertificatesSubTopNav } from "@/components/certificate/certificates-sub-top-nav"
import { StarsBackground } from "@/components/ui/stars-background"
import type { ReactNode } from "react"

interface VerifyCertificateLayoutProps {
  children: ReactNode
}

export default function VerifyCertificateLayout({ children }: Readonly<VerifyCertificateLayoutProps>) {
  return (
    <div className="min-h-screen bg-background">
          {/* Stars Background */}
      <StarsBackground />
      {/* Sub Nav Bar */}
      <CertificatesSubTopNav />
      <main className="container mx-auto px-4 pt-24 pb-16">
        {children}
      </main>
    </div>
  )
}
