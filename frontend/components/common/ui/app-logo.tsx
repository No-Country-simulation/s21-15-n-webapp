import { cn } from "@/lib/utils"
import { Rocket } from "lucide-react"

type LogoSize = "sm" | "md" | "lg"

interface AppLogoProps {
  readonly size?: LogoSize
  readonly showText?: boolean
  readonly className?: string
}

export function AppLogo({ size = "md", showText = true, className }: AppLogoProps) {
  // Definir tamaños para diferentes variantes
  const sizes = {
    sm: {
      container: "h-8",
      icon: "h-5 w-5",
      text: "text-lg",
      gap: "gap-1.5",
    },
    md: {
      container: "h-10",
      icon: "h-6 w-6",
      text: "text-xl",
      gap: "gap-2",
    },
    lg: {
      container: "h-12",
      icon: "h-7 w-7",
      text: "text-2xl",
      gap: "gap-2.5",
    },
  }

  // Asegurarse de que el tamaño sea válido, si no, usar "md" como fallback
  const validSize = sizes[size] ? size : "md"
  const currentSize = sizes[validSize]

  return (
    <div className={cn("flex items-center", currentSize.gap, currentSize.container, className)}>
      <div className="transform rotate-[270deg]">
        <Rocket className={cn("text-primary", currentSize.icon)} />
      </div>
      {showText && <span className={cn("font-bold tracking-tight", currentSize.text)}>StartPerks</span>}
    </div>
  )
}
