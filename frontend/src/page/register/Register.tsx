import { FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Rocket } from "lucide-react"

import { PinInput } from "../../common/PinInput"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../components/ui/card"
import { Input } from "../../components/ui/input"

import { useRandomStars } from "../../hooks"
import { Link } from "react-router-dom"


export default function RegisterPage() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [pin, setPin] = useState("")
  const stars = useRandomStars(50)

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
      // Validations
      if (password !== confirmPassword) {
        setError("Passwords do not match")
        setLoading(false)
        return
      }

      if (!pin || pin.length !== 4) {
        setError("Please enter a 4-digit PIN")
        setLoading(false)
        return
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store in localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users") ?? "[]")

      // Check if email exists
      if (storedUsers.some((user: any) => user.email === email)) {
        setError("Email already registered")
        setLoading(false)
        return
      }

      // Save new user
      storedUsers.push({
        fullName,
        email,
        password,
        pin,
      })

      localStorage.setItem("users", JSON.stringify(storedUsers))

      // Redirect to login
      navigate("/login")
    } catch (err) {
      setError("Error registering user")
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
          <CardTitle className="text-center text-2xl font-bold">Create Account</CardTitle>
          <CardDescription className="text-center">Enter your details to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground"
              />
            </div>
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
            <div className="space-y-2">
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                required
                className="border-primary/20 bg-primary/10 placeholder:text-muted-foreground"
              />
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-2">Enter a 4-digit PIN for app locking</p>
              <PinInput onComplete={setPin} length={4} />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent text-white transition-all hover:opacity-90"
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
