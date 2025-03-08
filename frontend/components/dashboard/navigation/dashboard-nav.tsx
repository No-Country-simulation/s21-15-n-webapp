"use client"

import { useState } from "react"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"
import { MobileNav } from "./mobile-nav"

export function DashboardNav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <>
      <TopBar onMenuClick={() => setShowMobileMenu(true)} />
      <Sidebar />
      <MobileNav open={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </>
  )
}

