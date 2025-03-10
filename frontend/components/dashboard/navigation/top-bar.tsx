"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { AppLogo } from "@/components/common/ui/app-logo"
import { Button } from "@/components/ui/button"
import { UserMenu } from "@/components/dashboard/navigation/user-menu"

interface TopBarProps {
  readonly onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-30 h-16 border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
      <div className="flex h-full items-center justify-between px-4">
        {/* Botón de menú a la izquierda */}
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="flex items-center justify-center">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Abrir menú</span>
        </Button>

        {/* Logo centrado */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/" className="flex items-center">
            <AppLogo size="sm" className="text-foreground" />
          </Link>
        </div>

        {/* UserMenu a la derecha */}
        <div className="flex items-center justify-center">
          <UserMenu />
        </div>
      </div>
    </div>
  )
}
