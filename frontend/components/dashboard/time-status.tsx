"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { useState, useEffect } from "react"

export function TimeStatus() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-white">
          <Clock className="h-5 w-5 text-primary" />
          Time & Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center">
          <div className="h-32 w-32 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">
                {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
              <p className="text-xs text-gray-400">{time.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

