import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { name: "Ene", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Abr", value: 200 },
]

export function SystemMetrics() {
  return (
    <Card className="border-blue-500/20 bg-black/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-white">System Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#94a3b8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="value" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-green-500" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
