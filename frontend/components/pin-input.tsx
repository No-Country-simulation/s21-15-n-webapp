"use client"

import type React from "react"

import { useEffect, useRef, useState, useCallback } from "react"
import { Input } from "@/components/ui/input"

interface PinInputProps {
  onComplete: (pin: string) => void
  onClear?: () => void
  length?: number
}

export function PinInput({ onComplete, onClear, length = 4 }: PinInputProps) {
  const [values, setValues] = useState<string[]>(Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const focusInput = useCallback(
    (index: number) => {
      if (index >= 0 && index < length) {
        inputRefs.current[index]?.focus()
      }
    },
    [length],
  )

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newValues = [...values]
    newValues[index] = value.slice(-1) // Only take the last digit

    setValues(newValues)

    if (value && index < length - 1) {
      focusInput(index + 1)
    }

    // Check if all inputs are filled
    if (newValues.every((v) => v) && newValues.join("").length === length) {
      onComplete(newValues.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      focusInput(index - 1)
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").slice(0, length)
    if (!/^\d+$/.test(pastedData)) return

    const newValues = [...values]
    pastedData.split("").forEach((char, index) => {
      if (index < length) {
        newValues[index] = char
      }
    })
    setValues(newValues)

    if (pastedData.length === length) {
      onComplete(pastedData)
    }
  }

  const clearInputs = () => {
    setValues(Array(length).fill(""))
    focusInput(0)
    onClear?.()
  }

  useEffect(() => {
    focusInput(0)
  }, [focusInput])

  return (
    <div className="flex gap-2 justify-center">
      {values.map((value, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-2xl border-primary/20 bg-primary/10"
        />
      ))}
    </div>
  )
}

