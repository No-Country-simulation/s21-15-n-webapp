import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings } from "lucide-react"

export function SystemControls() {
  return (
    <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-white">
          <Settings className="h-5 w-5 text-primary" />
          System Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="h-24 rounded-lg border border-primary/20 bg-primary/5" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 rounded-lg border border-primary/20 bg-primary/5" />
            <div className="h-24 rounded-lg border border-primary/20 bg-primary/5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

