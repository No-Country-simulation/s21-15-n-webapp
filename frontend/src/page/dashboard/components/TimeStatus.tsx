import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Clock } from "lucide-react"

export function TimeStatus() {
  return (
    <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg font-medium text-white">
          <Clock className="h-5 w-5 text-blue-400" />
          Time & Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="h-32 w-32 rounded-full border border-blue-500/20 bg-blue-950/20" />
        </div>
      </CardContent>
    </Card>
  )
}
