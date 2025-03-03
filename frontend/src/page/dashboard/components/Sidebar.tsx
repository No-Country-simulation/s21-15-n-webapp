import { ScrollArea } from "../../../components/ui/scroll-area"
import { Bell, Activity } from "lucide-react"
import { Card } from "../../../components/ui/card"

interface SidebarProps {
  readonly position: "left" | "right"
}

export function Sidebar({ position }: SidebarProps) {
  const notifications = [
    { id: 1, title: "Sistema actualizado", time: "Hace 5 min" },
    { id: 2, title: "Alerta de combustible", time: "Hace 10 min" },
    { id: 3, title: "Nuevo mensaje", time: "Hace 15 min" },
  ]

  const progress = [
    { id: 1, title: "Test de navegación", progress: 75 },
    { id: 2, title: "Calibración de sensores", progress: 90 },
    { id: 3, title: "Diagnóstico de sistemas", progress: 60 },
  ]

  return (
    <div className="hidden border-primary/20 bg-background/60 backdrop-blur-xl lg:block lg:w-72">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center border-b border-primary/20 px-4">
          <h2 className="text-lg font-semibold">{position === "left" ? "Notificaciones" : "Progreso"}</h2>
        </div>
        <ScrollArea className="flex-1 px-4 py-6">
          <div className="space-y-4">
            {position === "left"
              ? notifications.map((item) => (
                  <Card key={item.id} className="p-4 border-primary/20 bg-primary/10">
                    <div className="flex items-start gap-3">
                      <Bell className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  </Card>
                ))
              : progress.map((item) => (
                  <Card key={item.id} className="p-4 border-primary/20 bg-primary/10">
                    <div className="flex items-start gap-3">
                      <Activity className="h-5 w-5 text-secondary" />
                      <div className="flex-1">
                        <p className="font-medium">{item.title}</p>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full bg-gradient-to-r from-secondary to-accent"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
