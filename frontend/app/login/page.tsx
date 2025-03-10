"use client"

import { useState, useEffect, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import Cookies from "js-cookie"
import Link from "next/link"
import { initializeDefaultUsers, setStoredUser, removeAuthCookie, removeStoredUser } from "@/config/auth/auth"
import { AUTH_TEXT } from "@/config/constants/ui-text"
import { ROUTES } from "@/config/constants/routes"
import { AUTH_CONFIG } from "@/config/constants/app-config"
import { AppLogo } from "@/components/common/ui/app-logo"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"
import { User } from "@/config/types"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    initializeDefaultUsers()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    removeAuthCookie()
    removeStoredUser()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const storedUsers = JSON.parse(localStorage.getItem(AUTH_CONFIG.defaultUsersKey) ?? "[]")
      const user = storedUsers.find((u: User) => u.email === email)

      if (user && user.password === password) {
        Cookies.set(AUTH_CONFIG.cookieName, "true", { expires: 7 })
        Cookies.set("user_role", user.role, { expires: 7 })
        setStoredUser(user)

        switch (user.role) {
          case "admin":
            router.push(ROUTES.ADMIN)
            break
          case "mentor":
            router.push(ROUTES.MENTOR)
            break
          case "company":
            router.push(ROUTES.COMPANY)
            break
          case "junior":
            router.push(ROUTES.JUNIOR)
            break
          default:
            router.push(ROUTES.HOME)
        }
      } else {
        setError(AUTH_TEXT.login.error)
      }
    } catch (err) {
      console.debug("Error:", err)
      setError(AUTH_TEXT.login.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-[#020817] p-4">
      {/* Estrellas y efectos de fondo */}
      <StarsBackground count={100} colors={["primary", "white", "secondary"]} className="z-1" />

      <div className="z-2 pointer-events-none">
        <MouseReflection />
      </div>

      {/* Card con fondo sólido */}
      <Card className="relative z-10 w-full max-w-md border-primary/50 bg-[#020817]/30 bg-clip-padding backdrop-blur-sm shadow-xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <AppLogo size="lg"/>
          </div>
          <CardTitle className="text-center text-2xl font-bold text-white">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Ingresa tus credenciales para acceder a tu cuenta
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit" form="loginForm" className="w-full btn-magenta" disabled={loading}>
              {loading ? "Cargando..." : "Ingresar"}
            </Button>
          </div>
          <p className="text-center text-sm text-gray-400">
            ¿No tienes una cuenta?{" "}
            <Link href={ROUTES.REGISTER} className="text-primary hover:underline">
              Crear cuenta
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
