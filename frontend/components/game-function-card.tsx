import type React from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { memo } from "react"

interface GameFunctionCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

export const GameFunctionCard = memo(function GameFunctionCard({ title, description, icon }: GameFunctionCardProps) {
  return (
    <Card className="bg-black/30 border-purple-900/20 backdrop-blur-sm">
      <CardHeader>
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/20">{icon}</div>
        <CardTitle className="text-xl text-white">{title}</CardTitle>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>
    </Card>
  )
})

