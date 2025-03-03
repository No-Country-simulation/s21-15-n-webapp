import { memo } from "react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  title: string
  description: string
}

export const HeroSection = memo(function HeroSection({ title, description }: HeroSectionProps) {
  return (
    <section className="flex flex-col items-center justify-center py-20 text-center">
      <div className="inline-block rounded-lg bg-gray-800/30 px-3 py-1 text-sm text-gray-400 mb-6">
        Version 1.0 Release
      </div>
      <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">{description}</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button variant="default" size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
          Get Started
        </Button>
        <Button variant="ghost" size="lg" className="text-white hover:bg-gray-800">
          Learn more →
        </Button>
      </div>
    </section>
  )
})

