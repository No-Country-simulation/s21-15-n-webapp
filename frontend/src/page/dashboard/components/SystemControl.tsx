import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Settings } from "lucide-react"

export function SystemControls() {
  return (
    <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-white">
          <Settings className="h-5 w-5 text-blue-400" />
          System Controls
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="h-24 rounded-lg border border-blue-500/20 bg-blue-950/20" />
          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 rounded-lg border border-blue-500/20 bg-blue-950/20" />
            <div className="h-24 rounded-lg border border-blue-500/20 bg-blue-950/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
