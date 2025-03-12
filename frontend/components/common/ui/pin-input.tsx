import { useEffect, useRef, useState, useCallback, KeyboardEvent, ClipboardEvent } from "react"
import { Input } from "@/components/ui/input"

interface PinInputProps {
  readonly onComplete: (pin: string) => void
  readonly onClear?: () => void
  readonly length?: number
  readonly isValidPin?: boolean
}

export function PinInput({ onComplete, onClear, length = 4, isValidPin = true }: PinInputProps) {
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

  const shouldFocusPreviousInput = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    return e.key === "Backspace" && !values[index] && index > 0
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (shouldFocusPreviousInput(e, index)) {
      focusInput(index - 1)
    }
  }

  const handlePaste = (e: ClipboardEvent) => {
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

  const clearInputs = useCallback(() => {
    setValues(Array(length).fill(""))
    focusInput(0)
    onClear?.()
  }, [length, focusInput, onClear])

  useEffect(() => {
    focusInput(0)
  }, [focusInput])

  useEffect(() => {
    if (!isValidPin) {
      clearInputs()
    }
  }, [isValidPin, clearInputs])

  return (
    <div className="flex gap-2 justify-center">
      {values.map((value, index) => (
        <Input
          key={`pin-input-${index.toString()}}`}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
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
