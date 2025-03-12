import { NavBar } from "@/components/landing/navigation/nav-bar"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"
import { HeroSection } from "@/components/landing/sections/hero-section"
import { StatsSection } from "@/components/landing/sections/stats-section"
import { BenefitsSection } from "@/components/landing/sections/benefits-section"
import { RankingSection } from "@/components/landing/sections/ranking-section"
import { StellarConquestsSection } from "@/components/landing/sections/stellar-conquests"
import { TestimonialsSection } from "@/components/landing/sections/testimonials-section"
import { FAQSection } from "@/components/landing/sections/faq-section"
import { Footer } from "@/components/landing/sections/footer"
import { HowItWorksSection } from "@/components/landing/sections/how-it-works"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <MouseReflection />
      <div className="relative z-10">
        <NavBar />
        <main>
          <HeroSection />
          <HowItWorksSection />
          <StatsSection />
          <BenefitsSection />
          <RankingSection />
          <StellarConquestsSection />
          <TestimonialsSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
