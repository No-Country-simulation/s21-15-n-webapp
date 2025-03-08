import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ErrorMessageProps {
  message: string
  className?: string
  variant?: "default" | "destructive" | "warning"
  icon?: boolean
}

export function ErrorMessage({ message, className, variant = "default", icon = true }: ErrorMessageProps) {
  if (!message) return null

  const variantClasses = {
    default: "text-red-500 bg-red-500/10",
    destructive: "text-destructive bg-destructive/10",
    warning: "text-yellow-500 bg-yellow-500/10",
  }

  return (
    <div className={cn("flex items-center gap-2 rounded-md px-3 py-2 text-sm", variantClasses[variant], className)}>
      {icon && <AlertCircle className="h-4 w-4" />}
      <span>{message}</span>
    </div>
  )
}

