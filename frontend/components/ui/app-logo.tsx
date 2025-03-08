import { Rocket } from "lucide-react"
import Link from "next/link"
import { ROUTES } from "@/lib/constants/routes"

interface AppLogoProps {
  showIcon?: boolean
  showText?: boolean
  size?: "sm" | "md" | "lg"
  asLink?: boolean
  className?: string
}

export function AppLogo({
  showIcon = true,
  showText = true,
  size = "md",
  asLink = false,
  className = "",
}: AppLogoProps) {
  // Configuración de tamaños
  const sizes = {
    sm: {
      container: "h-6 w-6",
      icon: "h-3 w-3",
      text: "text-sm",
      gap: "gap-1",
    },
    md: {
      container: "h-8 w-8",
      icon: "h-5 w-5",
      text: "text-lg",
      gap: "gap-2",
    },
    lg: {
      container: "h-12 w-12",
      icon: "h-6 w-6",
      text: "text-xl",
      gap: "gap-3",
    },
  }

  const currentSize = sizes[size]

  const logoContent = (
    <div className={`flex items-center ${currentSize.gap} ${className}`}>
      {showIcon && (
        <div className={`flex ${currentSize.container} items-center justify-center rounded-full bg-primary/20`}>
          <Rocket className={`${currentSize.icon} text-primary transform -rotate-90`} />
        </div>
      )}
      {showText && <span className={`${currentSize.text} font-semibold text-white`}>StartPerks</span>}
    </div>
  )

  if (asLink) {
    return <Link href={ROUTES.HOME}>{logoContent}</Link>
  }

  return logoContent
}

