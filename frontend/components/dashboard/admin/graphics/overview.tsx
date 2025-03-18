"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ChartContainer, ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "Ene", certificados: 1530, usuarios: 980 },
  { month: "Feb", certificados: 2200, usuarios: 1250 },
  { month: "Mar", certificados: 3400, usuarios: 1800 },
  { month: "Abr", certificados: 2800, usuarios: 2100 },
  { month: "May", certificados: 3650, usuarios: 2400 },
  { month: "Jun", certificados: 4200, usuarios: 2800 },
  { month: "Jul", certificados: 3800, usuarios: 3100 },
  { month: "Ago", certificados: 4100, usuarios: 3300 },
  { month: "Sep", certificados: 5200, usuarios: 3600 },
  { month: "Oct", certificados: 5600, usuarios: 3900 },
  { month: "Nov", certificados: 6700, usuarios: 4200 },
  { month: "Dic", certificados: 7500, usuarios: 4800 },
]

const chartConfig = {
  certificados: {
    label: "Certificados",
    color: "#001dff",
  },
  usuarios: {
    label: "Usuarios",
    color: "#ff7664",
  },
} satisfies ChartConfig
export function Overview() {
  return (
      <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
        <CardHeader className="items-center text-center">
          <CardTitle className="text-lg font-medium text-white">Tendencia de Certificados</CardTitle>
          <CardDescription className="text-sm text-white/80">Enero - Diciembre 2024</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] gap-6" >
            <ChartContainer config={chartConfig}>
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid vertical={true} horizontal={false} stroke="rgba(255,255,255,0.2)" />
                <XAxis dataKey="month" tick={{ fill: "white", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0,0,0,0.7)",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="certificados"
                  stroke="#001dff"
                  strokeWidth={2}
                  fillOpacity={0.4}
                  fill="#001dff"
                />
                <Area
                  type="monotone"
                  dataKey="usuarios"
                  stroke="#ff7664"
                  strokeWidth={2}
                  fillOpacity={0.4}
                  fill="#ff7664"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-center gap-2 text-sm">
          <div className="p-4">
            <div className="flex justify-center items-center">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#001dff]" />
              <span className="text-sm text-white">Certificados</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#ff7664]" />
              <span className="text-sm text-white">Usuarios</span>
            </div>
            </div>
            <div className="flex items-center gap-2 font-medium leading-none text-white">
              Crecimiento del 5.2% este mes <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-white/70">Mostrando datos de Enero - Diciembre 2024</div>
          </div>
        </CardFooter>
      </Card>
  )
}
