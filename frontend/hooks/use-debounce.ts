"use client"

import { useState, useEffect } from "react"

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    // Actualizar el valor debounced después del delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancelar el timeout si el valor cambia (o el componente se desmonta)
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

