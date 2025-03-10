"use client"

import { AnchorHTMLAttributes, forwardRef, MouseEvent, ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  isActive?: boolean
  children: ReactNode
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ href, isActive, className, children, ...props }, ref) => {
    // Determinar si el enlace es para una sección en la misma página
    const isSectionLink = href.startsWith("#")

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
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
          isActive ? "text-magenta font-semibold" : "text-muted-foreground hover:text-foreground",
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
