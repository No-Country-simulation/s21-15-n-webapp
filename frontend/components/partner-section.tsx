import { memo } from "react"
import Image from "next/image"

interface PartnerSectionProps {
  partners: Array<{ name: string; logo: string }>
}

export const PartnerSection = memo(function PartnerSection({ partners }: PartnerSectionProps) {
  return (
    <section className="py-24 border-t border-gray-800">
      <div className="text-center mb-12">
        <div className="inline-block rounded-lg bg-gray-800/30 px-3 py-1 text-sm text-gray-400 mb-6">Partners</div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Trusted by leading companies</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {partners.map((partner, index) => (
          <div
            key={index}
            className="relative h-12 w-32 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          >
            <Image src={partner.logo || "/placeholder.svg"} alt={partner.name} fill className="object-contain" />
          </div>
        ))}
      </div>
    </section>
  )
})

