"use client"

import type React from "react"
import { forwardRef } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  isActive?: boolean
  children: React.ReactNode
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, isActive, className, children, ...props }, ref) => {
    // Determinar si el enlace es para una sección en la misma página
    const isSectionLink = href.startsWith("#")

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isSectionLink) {
        e.preventDefault()
        const targetId = href.substring(1)
        const targetElement = document.getElementById(targetId)

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Ajustar para el header fijo
            behavior: "smooth",
          })
        }
      }

      // Ejecutar el onClick original si existe
      if (props.onClick) {
        props.onClick(e)
      }
    }

    return (
      <Link
        ref={ref}
        href={href}
        onClick={handleClick}
        className={cn(
          "relative px-1 py-2 text-sm font-medium transition-colors",
          isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    )
  },
)

NavLink.displayName = "NavLink"

