"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"

export function useNavigation() {
  const router = useRouter()

  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const header = document.querySelector("header")
      const headerHeight = header?.offsetHeight ?? 0
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }, [])

  const navigateToPage = useCallback(
    (path: string) => {
      router.push(path)
    },
    [router],
  )

  const handleLogout = useCallback(() => {
    // Limpiar datos de sesión
    localStorage.removeItem("currentUser")
    localStorage.removeItem("auth")

    // Redirigir a la landing page
    router.push("/")
  }, [router])

  return {
    navigateToSection,
    navigateToPage,
    handleLogout,
  }
}
