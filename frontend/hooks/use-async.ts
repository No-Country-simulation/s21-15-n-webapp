"use client"

import { useState, useCallback } from "react"

interface UseAsyncReturn<T, E = Error> {
  execute: (...args: any[]) => Promise<T | undefined>
  status: "idle" | "pending" | "success" | "error"
  value: T | null
  error: E | null
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  reset: () => void
}

export function useAsync<T, E = Error>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate = false,
): UseAsyncReturn<T, E> {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle")
  const [value, setValue] = useState<T | null>(null)
  const [error, setError] = useState<E | null>(null)

  // El useCallback asegura que la función no se recree en cada render
  // a menos que asyncFunction cambie
  const execute = useCallback(
    async (...args: any[]) => {
      setStatus("pending")
      setValue(null)
      setError(null)

      try {
        const result = await asyncFunction(...args)
        setValue(result)
        setStatus("success")
        return result
      } catch (error) {
        setError(error as E)
        setStatus("error")
        return undefined
      }
    },
    [asyncFunction],
  )

  const reset = useCallback(() => {
    setStatus("idle")
    setValue(null)
    setError(null)
  }, [])

  // Ejecutar inmediatamente si se solicita
  // useEffect(() => {
  //   if (immediate) {
  //     execute()
  //   }
  // }, [execute, immediate])

  return {
    execute,
    status,
    value,
    error,
    isLoading: status === "pending",
    isSuccess: status === "success",
    isError: status === "error",
    reset,
  }
}

