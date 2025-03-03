
import { Menu } from "lucide-react"

import { useState } from "react"
import { Button } from "../../../components/ui/button"
import { MobileNav } from "./MobileNav"

export function DashboardNav() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-primary/20 bg-background/60 backdrop-blur-xl">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMobileMenu(true)}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-lg font-bold">SPACE NAVIGATION SYSTEM</h1>
          </div>
        </div>
      </header>
      <MobileNav open={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </>
  )
}
