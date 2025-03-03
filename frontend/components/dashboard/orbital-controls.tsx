import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Orbit } from "lucide-react"

export function OrbitalControls() {
  return (
    <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-white">
          <Orbit className="h-5 w-5 text-primary" />
          Orbital Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-32 rounded-lg border border-primary/20 bg-primary/5" />
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full border border-primary/20 bg-primary/5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

