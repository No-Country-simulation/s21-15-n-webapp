"use client"

import { useEffect, useRef, useState } from "react"

interface MouseReflectionProps {
  readonly enabled?: boolean
}

export function MouseReflection({ enabled = true }: MouseReflectionProps) {
  const [mousePosition, setMousePosition] = useState({ x: "50%", y: "50%" })
  const [isVisible, setIsVisible] = useState(false)
  const effectRef = useRef<HTMLDivElement>(null)
  console.debug("Mouse Position: ", mousePosition)
  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100

      document.documentElement.style.setProperty("--mouse-x", `${x}%`)
      document.documentElement.style.setProperty("--mouse-y", `${y}%`)

      setMousePosition({ x: `${x}%`, y: `${y}%` })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [enabled])

  if (!enabled) return null

  return <div ref={effectRef} className="mouse-effect" data-visible={isVisible} />
}
