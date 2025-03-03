import { HeroSection } from "./components/sections/HeroSection"
import { HowItWorks } from "./components/sections/HowItWorks"
import { Benefits } from "./components/sections/Benefits"
import { RankingTable } from "./components/sections/RankingTable"
import { TestimonialsSection } from "./components/sections/TestimonialsSection"
import { Header } from "./components/navigation/Header"
import { StatsSection } from "./components/sections/StatsSection"
import { StellarConquestsSection } from "./components/sections/StellarConquests"
import { Footer } from "./components/navigation/footer"
import { FAQSection } from "./components/sections/FaqSection"
import { LockOverlay } from "../../common/LockOverlay"
import { useMousePosition, useVisibilityState } from "../../hooks"

export default function Page() {
  const { mousePosition, isMounted } = useMousePosition()
  const { isVisible, wasHidden, setWasHidden } = useVisibilityState()

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-[#030303]">
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
      {(!isVisible || wasHidden) && <LockOverlay onUnlock={() => setWasHidden(false)} />}

      {/* Main Content */}
      <div className="relative" id="main-content">
        <Header />
        <main>
          <HeroSection />
          <StatsSection />
          <HowItWorks />
          <Benefits />
          <RankingTable />
          <StellarConquestsSection />
          <TestimonialsSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
