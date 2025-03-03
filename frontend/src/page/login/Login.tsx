import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Rocket } from "lucide-react"

import Cookies from "js-cookie"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/ui/card"

import { useRandomStars } from "../../hooks"

export default function LoginPage() {
  const router = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const stars = useRandomStars(50)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const storedUsers = JSON.parse(localStorage.getItem("users") ?? "[]")
      const user = storedUsers.find((u: any) => u.email === email)

      if (user && user.password === password) {
        // Save session
        Cookies.set("auth", "true", { expires: 7 })
        localStorage.setItem(
          "currentUser",
          JSON.stringify({
            name: user.fullName,
            email: user.email,
            pin: user.pin,
          }),
        )
        router("/dashboard")
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("Error signing in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute inline-flex animate-pulse ${star.color}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animation: `pulse ${star.duration}s infinite`,
            }}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-full w-full rounded-full bg-primary" />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />

      <Card className="relative w-full max-w-md border-primary/20 bg-background/60 backdrop-blur-xl">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-center text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-center">Sign in to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent text-white transition-all hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Create account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
