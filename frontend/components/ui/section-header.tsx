import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  align?: "left" | "center" | "right"
}

export function SectionHeader({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
  align = "left",
}: SectionHeaderProps) {
  const alignClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }

  return (
    <div className={cn("mb-6", alignClasses[align], className)}>
      <h2 className={cn("text-2xl font-bold tracking-tight text-white", titleClassName)}>{title}</h2>
      {description && <p className={cn("mt-2 text-muted-foreground", descriptionClassName)}>{description}</p>}
    </div>
  )
}

