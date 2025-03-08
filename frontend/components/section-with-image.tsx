import { cn } from "@/lib/utils"
import Image from "next/image"
import { memo } from "react"

interface SectionWithImageProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  imagePosition?: "left" | "right"
  className?: string
}

export const SectionWithImage = memo(function SectionWithImage({
  title,
  description,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  className,
}: SectionWithImageProps) {
  return (
    <div className={cn("grid gap-12 md:grid-cols-2 items-center", className)}>
      <div className={cn(imagePosition === "right" ? "md:order-1" : "md:order-2")}>
        <div className="inline-block rounded-lg bg-gray-800/30 px-3 py-1 text-sm text-gray-400 mb-6">Featured</div>
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">{title}</h2>
        <p className="text-lg leading-8 text-gray-400">{description}</p>
      </div>
      <div
        className={cn(
          "relative aspect-video overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/30",
          imagePosition === "right" ? "md:order-2" : "md:order-1",
        )}
      >
        <Image src={imageSrc || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </div>
  )
})

