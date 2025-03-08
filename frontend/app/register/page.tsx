"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { PinInput } from "@/components/pin-input"
import { initializeDefaultUsers } from "@/lib/utils/auth"
import { AUTH_TEXT } from "@/lib/constants/ui-text"
import { ROUTES } from "@/lib/constants/routes"
import { AUTH_CONFIG } from "@/lib/constants/app-config"
import { AppLogo } from "@/components/ui/app-logo"
import { StarsBackground } from "@/components/ui/stars-background"

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState("")

  // Inicializar usuarios predeterminados si no existen
  useEffect(() => {
    initializeDefaultUsers()
  }, [])

  // Modificar la función handleSubmit para validar el PIN antes de proceder
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    try {
      // Validations
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

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store in localStorage with default role
      const storedUsers = JSON.parse(localStorage.getItem(AUTH_CONFIG.defaultUsersKey) || "[]")

      // Check if email exists
      if (storedUsers.some((user: any) => user.email === email)) {
        setError(AUTH_TEXT.register.emailExists)
        setLoading(false)
        return
      }

      // Add new user with default role
      storedUsers.push({
        fullName,
        email,
        password,
        pin,
        role: "junior", // Default role
        level: 1, // Starting level
        experience: 0, // Starting XP
        streakDays: 0, // Starting streak
        badges: [], // Empty badges array
        createdAt: new Date().toISOString(),
      })

      localStorage.setItem(AUTH_CONFIG.defaultUsersKey, JSON.stringify(storedUsers))

      // Redirect to login
      router.push(ROUTES.LOGIN)
    } catch (err) {
      setError(AUTH_TEXT.register.error)
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
          <CardTitle className="text-center text-2xl font-bold">{AUTH_TEXT.register.title}</CardTitle>
          <CardDescription className="text-center">{AUTH_TEXT.register.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="registerForm" onSubmit={handleSubmit} className="space-y-4">
            {/* Modificar los inputs para mantener el color de fondo */}
            <div className="space-y-2">
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground focus:bg-primary/10"
              />
            </div>
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
            <div className="space-y-2">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground focus:bg-primary/10"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-2">{AUTH_TEXT.register.pinLabel}</p>
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
              {loading ? AUTH_TEXT.register.loading : AUTH_TEXT.register.button}
            </Button>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {AUTH_TEXT.register.hasAccount}{" "}
            <Link href={ROUTES.LOGIN} className="text-primary hover:underline">
              {AUTH_TEXT.register.signIn}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

