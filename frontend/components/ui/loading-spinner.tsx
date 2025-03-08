import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  variant?: "default" | "primary" | "secondary" | "destructive"
}

export function LoadingSpinner({ size = "md", className, variant = "primary" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-3",
    lg: "h-16 w-16 border-4",
  }

  const variantClasses = {
    default: "border-muted-foreground/20 border-t-muted-foreground",
    primary: "border-primary/20 border-t-primary",
    secondary: "border-secondary/20 border-t-secondary",
    destructive: "border-destructive/20 border-t-destructive",
  }

  return <div className={cn("animate-spin rounded-full", sizeClasses[size], variantClasses[variant], className)} />
}

