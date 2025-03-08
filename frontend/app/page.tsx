import { NavBar } from "@/components/navigation/nav-bar"
import { MouseReflection } from "@/components/effects/mouse-reflection"
import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { RankingSection } from "@/components/sections/ranking-section"
import { ConquistasSection } from "@/components/sections/conquistas-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { Footer } from "@/components/sections/footer"
import { StarsBackground } from "@/components/ui/stars-background"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Mouse reflection effect */}
      <MouseReflection />

      {/* Stars Background */}
      <StarsBackground />

      {/* Background gradients */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(var(--primary-rgb),0.2),transparent_50%)]" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(var(--primary-rgb),0.2),transparent_50%)]" />

      {/* Content */}
      <div className="relative z-10">
        <NavBar />
        <main>
          <HeroSection />
          <StatsSection />
          <FeaturesSection />
          <BenefitsSection />
          <RankingSection />
          <ConquistasSection />
          <TestimonialsSection />
          <FAQSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}

