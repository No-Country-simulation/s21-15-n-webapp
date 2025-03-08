import { CertificatesTopNav } from "@/components/certificate/certificates-top-nav"
import type { ReactNode } from "react"

export default function CertificatesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <CertificatesTopNav />
      <main className="container mx-auto px-4 pt-24 pb-16">{children}</main>
    </div>
  )
}

