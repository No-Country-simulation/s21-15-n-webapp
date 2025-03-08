import { memo } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  imageSrc: string
  title: string
  description: string
  className?: string
}

const FeatureCard = memo(function FeatureCard({ imageSrc, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/30 p-8 transition-all hover:border-gray-700",
        className,
      )}
    >
      <div className="relative z-10">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800/50">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} width={24} height={24} className="h-6 w-6" />
        </div>
        <h3 className="mb-2 text-xl font-medium text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
    </div>
  )
})

interface FeatureGridProps {
  features: Array<{
    imageSrc: string
    title: string
    description: string
  }>
}

export const FeatureGrid = memo(function FeatureGrid({ features }: FeatureGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  )
})

