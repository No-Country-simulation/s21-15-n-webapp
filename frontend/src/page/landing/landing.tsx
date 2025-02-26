import { useMouseReflection, usePageSecurity } from "../../hooks"
import { Header } from "./components/navigation/Header"
import { HeroSection } from "./components/sections/HeroSection"
import { HowItWorks } from "./components/sections/HowItWorks"
import { Benefits } from "./components/sections/Benefits"
import { RankingTable } from "./components/sections/RankingTable"
import { LockOverlay } from "./components/common/lockOverlay"

export default function Landing() {
  const { mousePosition } = useMouseReflection()
  const { isVisible, wasHidden, handleUnlock } = usePageSecurity()

  return (
    <div className="min-h-screen bg-background">
      {/* Interactive Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-transparent" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.2),transparent_50%)]"
          style={{
            transform: `translate(${mousePosition.x - 50}%, ${mousePosition.y - 50}%)`,
          }}
        />
      </div>
      {/* Lock Overlay */}
      {(!isVisible || wasHidden) && <LockOverlay onUnlock={handleUnlock} />}
      {/* Main Content */}
      <div className="relative">
        <Header />
        <main>
          <HeroSection />
          <HowItWorks />
          <Benefits />
          <RankingTable />
        </main>
      </div>
    </div>
  )
}
