"use client"

import { useState, useRef, useEffect, MouseEvent } from "react"
import { cn } from "@/lib/utils/utils"

interface Point {
  x: number
  y: number
  index: number
}

interface PatternLockProps {
  readonly size?: number
  readonly onComplete: (pattern: number[]) => void
}

export function PatternLock({ size = 3, onComplete }: Readonly<PatternLockProps>) {
  const [pattern, setPattern] = useState<number[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPoint, setCurrentPoint] = useState<Point | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const pointsRef = useRef<Point[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const dots = Array.from(container.getElementsByClassName("pattern-dot"))
    const points: Point[] = dots.map((dot, index) => {
      const rect = dot.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
        index,
      }
    })
    pointsRef.current = points
  }, [size])

  const handleMouseDown = (index: number) => {
    setPattern([index])
    setIsDrawing(true)
    const point = pointsRef.current.find((p) => p.index === index)
    if (point) setCurrentPoint(point)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDrawing || !containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - containerRect.left
    const y = e.clientY - containerRect.top

    const closestPoint = pointsRef.current.find((point) => {
      const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
      return distance < 20 && !pattern.includes(point.index)
    })

    if (closestPoint) {
      setPattern((prev) => [...prev, closestPoint.index])
      setCurrentPoint(closestPoint)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    setCurrentPoint(null)
    if (pattern.length > 0) {
      onComplete(pattern)
    }
    setPattern([])
  }

  return (
    <div
      ref={containerRef}
      className="relative h-[300px] w-[300px]"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-8 p-8">
        {Array.from({ length: size * size }).map((_, i) => (
          <div
            key={i}
            className={cn("pattern-dot", pattern.includes(i) && "active")}
            onMouseDown={() => handleMouseDown(i)}
          />
        ))}
      </div>

      {pattern.length > 1 && (
        <svg className="absolute inset-0 pointer-events-none">
          {pattern.slice(0, -1).map((point, i) => {
            const start = pointsRef.current[point]
            const end = pointsRef.current[pattern[i + 1]]
            if (!start || !end) return null

            return (
              <line
                key={i}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                className="stroke-primary/30"
                strokeWidth="2"
              />
            )
          })}
          {isDrawing && currentPoint && pattern.length > 0 && (
            <line
              x1={currentPoint.x}
              y1={currentPoint.y}
              x2={currentPoint.x}
              y2={currentPoint.y}
              className="stroke-primary/30"
              strokeWidth="2"
            />
          )}
        </svg>
      )}
    </div>
  )
}
