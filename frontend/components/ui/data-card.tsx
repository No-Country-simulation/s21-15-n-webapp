import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface DataCardProps {
  title: string
  value: string | number | ReactNode
  description?: string
  icon?: ReactNode
  className?: string
  contentClassName?: string
  variant?: "default" | "primary" | "secondary" | "destructive"
}

export function DataCard({
  title,
  value,
  description,
  icon,
  className,
  contentClassName,
  variant = "default",
}: DataCardProps) {
  const variantClasses = {
    default: "border-border bg-card",
    primary: "border-primary/20 bg-primary/5",
    secondary: "border-secondary/20 bg-secondary/5",
    destructive: "border-destructive/20 bg-destructive/5",
  }

  return (
    <Card className={cn(variantClasses[variant], className)}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon && <div className="opacity-70">{icon}</div>}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={cn("text-2xl font-bold", contentClassName)}>{value}</CardContent>
    </Card>
  )
}

