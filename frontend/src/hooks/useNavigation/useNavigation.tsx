import { useCallback } from "react"
import { useNavigate } from "react-router-dom"

export function useNavigation() {
  const navigate = useNavigate()

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
      navigate(path)
    },
    [navigate],
  )

  const handleLogout = useCallback(() => {
    // Limpiar datos de sesión
    localStorage.removeItem("currentUser")
    localStorage.removeItem("auth")

    // Redirigir a la landing page
    navigate("/")
  }, [navigate])

  return {
    navigateToSection,
    navigateToPage,
    handleLogout,
  }
}
