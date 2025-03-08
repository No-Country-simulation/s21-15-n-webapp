import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface BadgeWithIconProps {
  icon: ReactNode
  children: ReactNode
  variant?: "default" | "secondary" | "destructive" | "outline"
  className?: string
}

export function BadgeWithIcon({ icon, children, variant = "default", className }: BadgeWithIconProps) {
  return (
    <Badge variant={variant} className={cn("flex items-center gap-1", className)}>
      {icon}
      <span>{children}</span>
    </Badge>
  )
}

