import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Compass } from "lucide-react"

export function NavigationControls() {
  return (
    <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-white">
          <Compass className="h-5 w-5 text-blue-400" />
          Navigation Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-32 rounded-lg border border-blue-500/20 bg-blue-950/20" />
          <div className="flex justify-center">
            <div className="h-24 w-24 rounded-full border border-blue-500/20 bg-blue-950/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
