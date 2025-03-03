import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { PinInput } from "./components/pin-input"
import { PatternLock } from "./components/pattern-lock"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Label } from "../../../components/ui/label"

export function SecurityTab() {
  const [lockMethod, setLockMethod] = useState<"pin" | "pattern">("pin")
  const [currentPin, setCurrentPin] = useState("")
  const [showChangeForm, setShowChangeForm] = useState(false)

  const handleVerifyCurrentLock = (value: string | number[]) => {
    // In a real app, verify against stored value
    const storedPin = localStorage.getItem("lockPin")
    if (typeof value === "string" && value === storedPin) {
      setShowChangeForm(true)
    }
  }

  const handleChangeLock = (value: string | number[]) => {
    if (typeof value === "string") {
      localStorage.setItem("lockPin", value)
    } else {
      localStorage.setItem("lockPattern", JSON.stringify(value))
    }
    setShowChangeForm(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Método de Bloqueo</CardTitle>
          <CardDescription>Elige cómo quieres proteger tu cuenta cuando cambies de pestaña</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={lockMethod}
            onValueChange={(value) => setLockMethod(value as "pin" | "pattern")}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pin" id="pin" />
              <Label htmlFor="pin">PIN de 4 dígitos</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pattern" id="pattern" />
              <Label htmlFor="pattern">Patrón de desbloqueo</Label>
            </div>
          </RadioGroup>

          {!showChangeForm ? (
            <div className="mt-6">
              <h4 className="mb-4 text-sm font-medium">Ingresa tu {lockMethod === "pin" ? "PIN" : "patrón"} actual:</h4>
              {lockMethod === "pin" ? (
                <PinInput onComplete={handleVerifyCurrentLock} />
              ) : (
                <PatternLock onComplete={handleVerifyCurrentLock} />
              )}
            </div>
          ) : (
            <div className="mt-6">
              <h4 className="mb-4 text-sm font-medium">Ingresa tu nuevo {lockMethod === "pin" ? "PIN" : "patrón"}:</h4>
              {lockMethod === "pin" ? (
                <PinInput onComplete={handleChangeLock} />
              ) : (
                <PatternLock onComplete={handleChangeLock} />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
