import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Progress } from "../../../components/ui/progress"

const metrics = [
  { label: "System Integrity", value: 85, color: "bg-blue-500" },
  { label: "Fuel Level", value: 72, color: "bg-green-500" },
  { label: "Oxygen Level", value: 94.4, color: "bg-cyan-500" },
]

export function SystemStatus() {
  return (
    <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">System Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-blue-400">{metric.label}</span>
              <span className="text-sm text-white">{metric.value}%</span>
            </div>
            <Progress value={metric.value} className={metric.color} />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
