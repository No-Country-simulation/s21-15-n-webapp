"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import Cookies from "js-cookie"
import Link from "next/link"
import { initializeDefaultUsers, setStoredUser, removeAuthCookie, removeStoredUser } from "@/lib/utils/auth"
import { AUTH_TEXT } from "@/lib/constants/ui-text"
import { ROUTES } from "@/lib/constants/routes"
import { AUTH_CONFIG } from "@/lib/constants/app-config"
import { AppLogo } from "@/components/ui/app-logo"
import { StarsBackground } from "@/components/ui/stars-background"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Inicializar usuarios predeterminados si no existen
  useEffect(() => {
    initializeDefaultUsers()
  }, [])

  // Modificar la función handleSubmit para establecer la cookie de rol
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Asegurar que cualquier sesión previa se cierre
    removeAuthCookie()
    removeStoredUser()

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const storedUsers = JSON.parse(localStorage.getItem(AUTH_CONFIG.defaultUsersKey) || "[]")
      const user = storedUsers.find((u: any) => u.email === email)

      if (user && user.password === password) {
        // Save session
        Cookies.set(AUTH_CONFIG.cookieName, "true", { expires: 7 })
        // Establecer cookie de rol para el middleware
        Cookies.set("user_role", user.role, { expires: 7 })
        setStoredUser(user)

        // Redirigir según rol
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
          default:
            router.push(ROUTES.JUNIOR)
        }
      } else {
        setError(AUTH_TEXT.login.error)
      }
    } catch (err) {
      setError(AUTH_TEXT.login.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Stars Background */}
      <StarsBackground />

      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

      <Card className="relative w-full max-w-md border-primary/20 bg-background/60 backdrop-blur-xl">
        <CardHeader className="space-y-4">
          <div className="flex justify-center">
            <AppLogo size="lg" asLink={true} />
          </div>
          <CardTitle className="text-center text-2xl font-bold">{AUTH_TEXT.login.title}</CardTitle>
          <CardDescription className="text-center">{AUTH_TEXT.login.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="loginForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground focus:bg-primary/10"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
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
              {loading ? AUTH_TEXT.login.loading : AUTH_TEXT.login.button}
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {AUTH_TEXT.login.noAccount}{" "}
            <Link href={ROUTES.REGISTER} className="text-primary hover:underline">
              {AUTH_TEXT.login.createAccount}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

