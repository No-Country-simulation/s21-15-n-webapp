"use client"

import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, AlertCircle } from "lucide-react"
import { ROUTES } from "@/lib/constants/routes"
import { StarsBackground } from "@/components/ui/stars-background"

export default function SearchCertificatePage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState("")
  const [searchError, setSearchError] = useState("")

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setSearchError("Por favor ingresa un ID de certificado o nombre")
      return
    }

    // Check if the input looks like a certificate ID
    if (searchQuery.includes("-") && searchQuery.length > 8) {
      router.push(`${ROUTES.CERTIFICATES}/verify/${searchQuery}`)
    } else {
      // Assume it's a name search - in a real app, this would search the database
      setSearchError("No se encontraron certificados para esta búsqueda")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Stars Background */}
      <StarsBackground />
      {/* Main Content */}
      <main className="container mx-auto px-4 pt-36 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Buscar Certificado</h1>
          <p className="text-muted-foreground">Busca certificados por ID o nombre del recipiente</p>
        </div>

        <Card className="border-primary/20 bg-background/60 backdrop-blur-xl max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Buscar Certificado</CardTitle>
            <CardDescription>Ingresa el ID del certificado o el nombre del recipiente</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ej: CERT-2025-001-ABCDEF o David Caycedo"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setSearchError("")
                  }}
                  className="border-primary/20 bg-primary/10"
                />
                <Button type="submit" className="btn-magenta">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>

              {searchError && (
                <div className="flex items-center gap-2 text-destructive text-sm">
                  <AlertCircle className="h-4 w-4" />
                  <span>{searchError}</span>
                </div>
              )}
            </form>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-white mb-4">Ejemplos de búsqueda</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="font-mono text-primary">CERT-2025-001-ABCDEF</span> - Buscar por ID de certificado
                </li>
                <li className="flex items-center gap-2">
                  <span className="font-mono text-primary">David Caycedo</span> - Buscar por nombre del recipiente
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Si conoces el ID exacto del certificado, puedes verificarlo directamente en la sección de verificación.
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
