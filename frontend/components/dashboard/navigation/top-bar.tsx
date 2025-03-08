"use client"

import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { UserMenu } from "./user-menu"
import { usePathname } from "next/navigation"
import { AppLogo } from "@/components/ui/app-logo"

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const pathname = usePathname()

  return (
    <div className="fixed top-0 left-0 right-0 z-40 border-b border-primary/20 bg-background/80 backdrop-blur-sm lg:pl-64">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Left section with menu button */}
        <Button variant="ghost" size="icon" className="lg:hidden text-white" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Center section with logo only */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center">
          <AppLogo size="sm" />
        </div>

        {/* Right section with user menu */}
        <div className="ml-auto">
          <UserMenu />
        </div>
      </div>
    </div>
  )
}

