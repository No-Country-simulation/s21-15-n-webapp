"use client"

import { useState, useEffect, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { PinInput } from "@/components/common/ui/pin-input"
import { initializeDefaultUsers } from "@/config/auth/auth"
import { AUTH_TEXT } from "@/config/constants/ui-text"
import { ROUTES } from "@/config/constants/routes"
import { AUTH_CONFIG } from "@/config/constants/app-config"
import { AppLogo } from "@/components/common/ui/app-logo"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"
import { User } from "@/config/types"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState("")

  useEffect(() => {
    initializeDefaultUsers()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    try {
      if (password !== confirmPassword) {
        setError(AUTH_TEXT.register.passwordMismatch)
        setLoading(false)
        return
      }

      if (!pin || pin.length !== 4) {
        setError(AUTH_TEXT.register.pinRequired)
        setLoading(false)
        return
      }

      await new Promise((resolve) => setTimeout(resolve, 1000))

      const storedUsers = JSON.parse(localStorage.getItem(AUTH_CONFIG.defaultUsersKey) ?? "[]")

      if (storedUsers.some((user: User) => user.email === email)) {
        setError(AUTH_TEXT.register.emailExists)
        setLoading(false)
        return
      }

      storedUsers.push({
        fullName,
        email,
        password,
        pin,
        role: "junior",
        level: 1,
        experience: 0,
        streakDays: 0,
        badges: [],
        createdAt: new Date().toISOString(),
      })

      localStorage.setItem(AUTH_CONFIG.defaultUsersKey, JSON.stringify(storedUsers))
      router.push(ROUTES.LOGIN)
    } catch (err) {
      console.debug("Error:", err)
      setError(AUTH_TEXT.register.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#020817] p-4">
      {/* Estrellas y efectos de fondo */}
      <StarsBackground count={100} colors={["primary", "white"]} className="z-1" />
      <div className="z-2 pointer-events-none">
        <MouseReflection />
      </div>

      {/* Card con fondo sólido */}
      <Card className="relative z-10 w-full max-w-md border-primary/50 bg-[#020817]/30 bg-clip-padding backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <AppLogo size="lg" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-white">Crear Cuenta</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Ingresa tus datos para crear una nueva cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="registerForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="fullName"
                placeholder="Nombre completo"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground focus:bg-primary/10"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground focus:bg-primary/10"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Contraseña"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground focus:bg-primary/10"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground focus:bg-primary/10"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400 mb-2">Ingresa un PIN de 4 dígitos para bloqueo de app</p>
              <PinInput onComplete={setPin} length={4} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="flex w-full space-x-4">
            <Button
              type="button"
              variant="outline"
              className="w-full btn-gradient-border"
              onClick={() => router.push("/")}
            >
              Cancelar
            </Button>
            <Button type="submit" form="registerForm" className="w-full btn-magenta" disabled={loading}>
              {loading ? "Cargando..." : "Registrarse"}
            </Button>
          </div>
          <p className="text-center text-sm text-gray-400">
            ¿Ya tienes una cuenta?{" "}
            <Link href={ROUTES.LOGIN} className="text-primary hover:underline">
              Iniciar sesión
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
