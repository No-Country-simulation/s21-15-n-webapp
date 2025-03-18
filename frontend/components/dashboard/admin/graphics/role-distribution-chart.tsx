"use client"

import { useMemo } from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { role: "Juniors", users: 40, fill: "#7c96ff" },
  { role: "Mentores", users: 30, fill: "#c77aff" },
  { role: "Empresas", users: 30, fill: "#ff7a9c" },
]

const chartConfig = {
  users: {
    label: "Usuarios",
  },
  Juniors: {
    label: "Juniors",
    color: "#7c96ff",
  },
  Mentores: {
    label: "Mentores",
    color: "#c77aff",
  },
  Empresas: {
    label: "Empresas",
    color: "#ff7a9c",
  },
} satisfies ChartConfig

export function RoleDistributionChart() {
  const totalUsers = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.users, 0)
  }, [])

  return (
    <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
      <CardHeader className="items-center text-center">
        <CardTitle className="text-lg font-medium text-white">Distribución de Roles</CardTitle>
        <CardDescription className="text-sm text-white/80">Enero - Diciembre 2024 </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] items-center">
          <ChartContainer config={chartConfig} >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
                <Pie
                  data={chartData}
                  dataKey="users"
                  nameKey="role"
                  innerRadius={100}
                  outerRadius={150}
                  stroke="#0a0b1e"
                  strokeWidth={0}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-white text-3xl font-bold">
                              {totalUsers}
                            </tspan>
                            <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 24} className="fill-muted-foreground">
                              Usuarios
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
        </div>
        {/* Legend */}
        <div className="mt-4 flex justify-center gap-6">
          {chartData.map((entry) => (
            <div key={entry.role} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.fill }} />
              <span className="text-sm text-gray-400">
                {entry.role} ({entry.users}%)
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-white">
          Crecimiento del 5.2% este mes <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-gray-400">Mostrando datos de los últimos 6 meses</div>
      </CardFooter>
    </Card>
  )
}
