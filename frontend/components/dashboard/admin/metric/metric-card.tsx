import { ArrowDown, ArrowUp, Users, BarChart, FileText, Activity } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  readonly title: string
  readonly value: string
  readonly change: string
  readonly period: string
  readonly increasing: boolean
  readonly icon: "users" | "chart" | "files" | "activity"
  readonly className?: string
}

export function MetricCard({ title, value, change, period, increasing, icon, className }: MetricCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="h-6 w-6 text-primary" />
      case "chart":
        return <BarChart className="h-6 w-6 text-primary" />
      case "files":
        return <FileText className="h-6 w-6 text-primary" />
      case "activity":
        return <Activity className="h-6 w-6 text-primary" />
    }
  }

  return (
    <Card className={cn("border-primary/20 bg-black/50 backdrop-blur-sm p-6", className)}>
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2802d3]/20">{getIcon()}</div>
        <div className="text-right">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end">
        <div className={cn("flex items-center gap-1 text-sm", increasing ? "text-green-500" : "text-red-500")}>
          {increasing ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          <span>{change}</span>
        </div>
        <span className="ml-2 text-xs text-gray-400">{period}</span>
      </div>
    </Card>
  )
}
