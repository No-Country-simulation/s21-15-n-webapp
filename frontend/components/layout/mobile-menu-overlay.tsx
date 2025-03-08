"use client"

import type React from "react"

import { useEffect } from "react"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"

interface MobileMenuOverlayProps {
  isOpen: boolean
  children: React.ReactNode
}

export function MobileMenuOverlay({ isOpen, children }: MobileMenuOverlayProps) {
  // Efecto para manejar el blur solo cuando el menú está abierto
  useEffect(() => {
    const content = document.getElementById("app-content")

    if (content) {
      if (isOpen) {
        content.classList.add("blur-sm")
        content.classList.add("pointer-events-none")
      } else {
        content.classList.remove("blur-sm")
        content.classList.remove("pointer-events-none")
      }
    }

    return () => {
      if (content) {
        content.classList.remove("blur-sm")
        content.classList.remove("pointer-events-none")
      }
    }
  }, [isOpen])

  // Solo renderizamos si está abierto
  if (!isOpen) return null

  return createPortal(
    <div
      id="menu-overlay"
      className={cn(
        "fixed inset-0 z-30",
        "transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
    >
      {children}
    </div>,
    document.body,
  )
}

