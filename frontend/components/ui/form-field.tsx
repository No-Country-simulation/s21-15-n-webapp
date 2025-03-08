import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { ErrorMessage } from "@/components/ui/error-message"
import type { ReactNode } from "react"

interface FormFieldProps {
  label?: string
  htmlFor?: string
  error?: string
  children: ReactNode
  className?: string
  description?: string
  required?: boolean
}

export function FormField({
  label,
  htmlFor,
  error,
  children,
  className,
  description,
  required = false,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={htmlFor} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      {children}
      {error && <ErrorMessage message={error} />}
    </div>
  )
}

