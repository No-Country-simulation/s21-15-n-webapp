"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface TrendChartProps {
  readonly title: string
  readonly dateRange: string
  readonly data: []
  readonly series: string[]
  readonly colors?: string[]
}

export function TrendChart({ title, dateRange, data, series, colors = ["#2802d3", "#d03728"] }: TrendChartProps) {
  return (
    <Card className="border-[#2802d3]/20 bg-[#0a0b1e]">
      <CardHeader className="pb-2 text-center">
        <div className="flex flex-col items-center">
          <CardTitle className="text-lg font-medium text-white">{title}</CardTitle>
          <p className="text-xs text-gray-400">{dateRange}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <XAxis dataKey="date" stroke="#767676" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#767676"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#12142a",
                  borderColor: "#2802d3",
                  borderRadius: "0.5rem",
                }}
              />
              {series.map((serie, index) => (
                <Line
                  key={serie}
                  type="monotone"
                  dataKey={serie}
                  stroke={colors[index % colors.length]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 flex justify-center gap-6">
          {series.map((serie, index) => (
            <div key={serie} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
              <span className="text-sm text-gray-400">{serie}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
