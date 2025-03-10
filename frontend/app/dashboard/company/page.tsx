"use client"

import { Briefcase, Users, Star, TrendingUp } from "lucide-react"
import { DEFAULT_PROJECTS } from "@/config/mock/default-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"

export default function CompanyDashboard() {
  return (
    <DashboardLayout>
      <div className="relative">
        {/* Stars Background */}
        <StarsBackground count={100} colors={["primary", "white", "secondary"]} className="z-1" />
        <div className="z-2 pointer-events-none">
          <MouseReflection />
        </div>
        <div className="space-y-6 p-6">
          <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Panel Empresarial</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              {DEFAULT_PROJECTS.map((project) => (
                <div key={project.id} className="rounded-lg border border-primary/20 bg-primary/5 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-white">{project.name}</h3>
                      <p className="text-sm text-gray-400">{project.description}</p>
                    </div>
                    <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Progreso</span>
                      <span className="text-white">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Users className="h-4 w-4" />
                      <span>{project.team} miembros</span>
                    </div>
                    <Button variant="ghost" className="text-primary hover:text-primary/80">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-full bg-primary/20 p-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Proyectos Activos</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-full bg-primary/20 p-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Talentos Destacados</p>
                  <p className="text-2xl font-bold text-white">24</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-black/50 backdrop-blur-sm">
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-full bg-primary/20 p-3">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Tasa de Éxito</p>
                  <p className="text-2xl font-bold text-white">92%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
