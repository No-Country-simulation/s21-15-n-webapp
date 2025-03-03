import { useState, useEffect } from "react"

import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { toast } from "sonner"
import { Button } from "../../../components/ui/button"

export function PersonalInfoTab() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    bio: "",
  })

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? "{}")
    if (currentUser) {
      setFormData({
        fullName: currentUser.name || "",
        email: currentUser.email || "",
        bio: currentUser.bio || "",
      })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? "{}")
    const updatedUser = { ...currentUser, ...formData }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    // Actualizar también en el array de usuarios
    const users = JSON.parse(localStorage.getItem("users") ?? "[]")
    const updatedUsers = users.map((user: any) => {
      if (user.email === currentUser.email) {
        return { ...user, fullName: formData.fullName, bio: formData.bio }
      }
      return user
    })
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    toast.success("Perfil actualizado correctamente")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>Actualiza tu información de perfil</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre completo</label>
            <Input
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="border-primary/20 bg-primary/10"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input value={formData.email} disabled className="border-primary/20 bg-primary/10 opacity-50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Biografía</label>
            <Input
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="border-primary/20 bg-primary/10"
            />
          </div>
          <Button type="submit" className="w-full">
            Guardar cambios
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
