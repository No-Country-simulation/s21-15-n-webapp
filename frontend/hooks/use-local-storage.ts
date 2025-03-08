"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para almacenar nuestro valor
  // Pasar la función de inicialización a useState para que solo se ejecute una vez
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }

    try {
      // Obtener del localStorage por key
      const item = window.localStorage.getItem(key)
      // Parsear el JSON almacenado o devolver initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // Si hay error, devolver initialValue
      console.error(error)
      return initialValue
    }
  })

  // Función para actualizar el valor en localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que el valor sea una función para que tengamos la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Guardar el estado
      setStoredValue(valueToStore)
      // Guardar en localStorage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // Un error más descriptivo
      console.error(`Error al guardar ${key} en localStorage:`, error)
    }
  }

  // Sincronizar con localStorage cuando cambia en otra pestaña/ventana
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setStoredValue(JSON.parse(e.newValue))
      }
    }

    // Escuchar cambios en localStorage
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [key])

  return [storedValue, setValue]
}

