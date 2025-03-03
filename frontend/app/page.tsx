import { HeroSection } from "@/components/sections/hero-section"
import { StatsSection } from "@/components/sections/stats-section"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Benefits } from "@/components/sections/benefits"
import { RankingTable } from "@/components/sections/ranking-table"
import { ConquistasSection } from "@/components/sections/conquistas-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { FAQSection } from "@/components/sections/faq-section"
import { Footer } from "@/components/sections/footer"
import { Header } from "@/components/navigation/header"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <Benefits />
        <RankingTable />
        <ConquistasSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}

