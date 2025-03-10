"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useActiveSection } from "@/hooks/use-active-section"
import { useAuth } from "@/hooks/use-auth"
import HeaderDesktop from "@/components/landing/header/header-desktop"
import HeaderMobile from "@/components/landing/header/header-mobile"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const activeSection = useActiveSection()
  const { user, isAuthenticated, logout } = useAuth()

  console.debug("User: ", user)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      <HeaderDesktop
        isScrolled={isScrolled}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        isAuthenticated={isAuthenticated}
        logout={logout}
        router={router}
      />
      <HeaderMobile
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollToSection={scrollToSection}
        activeSection={activeSection}
        isAuthenticated={isAuthenticated}
        logout={logout}
        router={router}
      />
    </>
  )
}
