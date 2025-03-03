import { ReactNode, useEffect, useState } from "react"
import { DashboardNav } from "../components/DashboardNav"
import { Sidebar } from "../components/Sidebar"
import { useTabTitle, useVisibilityState } from "../../../hooks"
import { LockOverlay } from "../../../common/LockOverlay"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const { isVisible, wasHidden, setWasHidden } = useVisibilityState()
  const [userPin, setUserPin] = useState("")

  useTabTitle(!isVisible || wasHidden)

  useEffect(() => {
    // Obtener el PIN del usuario actual
    const currentUser = JSON.parse(localStorage.getItem("currentUser") ?? "{}")
    if (currentUser?.pin) {
      setUserPin(currentUser.pin)
    }
  }, [])

  const handleUnlock = () => {
    setWasHidden(false)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Lock Overlay */}
      {(!isVisible || wasHidden) && <LockOverlay onUnlock={handleUnlock} pinRequired={true} correctPin={userPin} />}

      {/* Sidebar izquierdo */}
      <Sidebar position="left" />

      {/* Contenido principal */}
      <div className="flex flex-1 flex-col">
        <DashboardNav />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      {/* Sidebar derecho */}
      <Sidebar position="right" />
    </div>
  )
}
