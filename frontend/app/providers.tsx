"use client"

import { ThemeProvider } from "next-themes"
import { APP_CONFIG } from "@/lib/constants/app-config"
import { ReactNode } from "react"

export function Providers({ children }: { readonly children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={APP_CONFIG.defaultTheme} enableSystem>
      {children}
    </ThemeProvider>
  )
}
