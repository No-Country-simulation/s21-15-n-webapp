"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2 } from "lucide-react"

interface SocialLink {
  id: string
  platform: string
  url: string
}

export function SocialLinksTab() {
  const [links, setLinks] = useState<SocialLink[]>([])
  const [newPlatform, setNewPlatform] = useState("")
  const [newUrl, setNewUrl] = useState("")

  const handleAddLink = () => {
    if (newPlatform && newUrl) {
      setLinks([
        ...links,
        {
          id: Date.now().toString(),
          platform: newPlatform,
          url: newUrl,
        },
      ])
      setNewPlatform("")
      setNewUrl("")
    }
  }

  const handleRemoveLink = (id: string) => {
    setLinks(links.filter((link) => link.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Redes Sociales</CardTitle>
        <CardDescription>Agrega tus perfiles de redes sociales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-4">
            <Input
              placeholder="Nombre de la red social"
              value={newPlatform}
              onChange={(e) => setNewPlatform(e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="URL del perfil"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleAddLink} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {links.map((link) => (
              <div key={link.id} className="flex items-center gap-4 rounded-md border border-primary/20 p-3">
                <div className="flex-1">
                  <p className="font-medium">{link.platform}</p>
                  <p className="text-sm text-muted-foreground">{link.url}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => handleRemoveLink(link.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

