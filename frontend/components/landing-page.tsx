"use client"

import { useCallback } from "react"
import { useVisibilityState } from "@/hooks/use-visibility-state"
import { useMousePosition } from "@/hooks/use-mouse-position"
import { useTabTitle } from "@/hooks/use-tab-title"
import { LockOverlay } from "@/components/lock-overlay"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function LandingPage() {
  const { mousePosition, isMounted } = useMousePosition()
  const { isVisible, wasHidden, setWasHidden } = useVisibilityState()
  useTabTitle(!isVisible || wasHidden)

  const handleUnlock = useCallback(() => {
    setWasHidden(false)
  }, [setWasHidden])

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Interactive Background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.2),transparent_50%)]"
          style={{
            transform: `translate(${mousePosition.x - 50}%, ${mousePosition.y - 50}%)`,
          }}
        />
      </div>

      {/* Lock Overlay */}
      {(!isVisible || wasHidden) && <LockOverlay onUnlock={handleUnlock} />}

      {/* Main Content */}
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="flex min-h-screen flex-col">
            <header className="flex h-14 items-center justify-between border-b border-gray-800 px-4 lg:h-20">
              <div className="flex items-center gap-4">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-lg font-semibold text-white">SmartNinja</span>
              </div>
              <Button variant="ghost" className="text-gray-400 hover:text-white">
                Sign In
              </Button>
            </header>

            <main className="flex-1">
              <section className="grid items-center gap-6 pb-8 pt-6 md:py-10">
                <div className="flex max-w-[980px] flex-col items-start gap-2">
                  <span className="rounded-lg bg-gray-800/30 px-3 py-1 text-sm text-gray-400">
                    Introducing SmartNinja AI
                  </span>
                  <h1 className="text-3xl font-bold leading-tight tracking-tighter text-white md:text-5xl lg:leading-[1.1]">
                    Share & SmartNinja in Everything
                  </h1>
                  <p className="max-w-[750px] text-lg text-gray-400 sm:text-xl">
                    Be creative with SmartNinja to be competitive in everything.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    Get Started
                  </Button>
                  <Button size="lg" variant="outline" className="text-white">
                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </section>

              <section className="py-12">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="group relative overflow-hidden rounded-lg border border-gray-800 bg-gray-950/30 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-800/30">
                      <Image
                        src="/placeholder.svg?height=24&width=24"
                        alt="Icon"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-white">Game Functions</h3>
                    <p className="mt-2 text-gray-400">Advanced gaming features powered by AI technology.</p>
                    <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
                  </div>
                  {/* Repeat similar cards for other features */}
                </div>
              </section>

              <section className="py-12">
                <div className="grid gap-12 md:grid-cols-2">
                  <div className="relative aspect-video overflow-hidden rounded-lg border border-gray-800 bg-gray-950/30">
                    <Image
                      src="/placeholder.svg?height=400&width=600"
                      alt="GameAI Core"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="rounded-lg bg-gray-800/30 px-3 py-1 text-sm text-gray-400 w-fit">GameAI Core</span>
                    <h2 className="mt-4 text-3xl font-bold text-white">Advanced AI Gaming</h2>
                    <p className="mt-4 text-gray-400">
                      Experience gaming like never before with our cutting-edge AI technology.
                    </p>
                  </div>
                </div>
              </section>
            </main>

            <footer className="border-t border-gray-800 py-6 text-center text-sm text-gray-400">
              © 2024 SmartNinja. All rights reserved.
            </footer>
          </div>
        </div>
      </div>
    </div>
  )
}

