"use client"

import { ThemeProvider } from "next-themes"
import { APP_CONFIG } from "@/config/constants/app-config"
import { ReactNode } from "react"

export function Providers({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme={APP_CONFIG.defaultTheme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
