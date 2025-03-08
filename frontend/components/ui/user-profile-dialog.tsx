"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { memo } from "react"
import { useRouter } from "next/navigation"

interface Streak {
  date: string
  points: number
  description: string
}

interface UserProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  user?: {
    name: string
    avatar: string
    role: string
    level: number
  } | null
}

const mockStreaks: Streak[] = [
  {
    date: "23 Feb 2024",
    points: 100,
    description: "Completó desafío de React",
  },
  {
    date: "22 Feb 2024",
    points: 75,
    description: "Participó en mentoría",
  },
  {
    date: "21 Feb 2024",
    points: 50,
    description: "Resolvió bug crítico",
  },
]

export const UserProfileDialog = memo(function UserProfileDialog({ open, onOpenChange, user }: UserProfileDialogProps) {
  const router = useRouter()

  if (!user) return null

  const handleLogin = () => {
    onOpenChange(false)
    router.push("/login")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-background text-white border-primary/20">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <DialogTitle className="text-xl font-bold text-white">{user.name}</DialogTitle>
              <span className="text-sm text-gray-400">{user.role}</span>
              <span className="text-sm text-primary">Nivel {user.level}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Rachas de Actividad</h4>
          <ScrollArea className="h-[200px] rounded-md border border-primary/20 bg-primary/5 p-4">
            <div className="space-y-4">
              {mockStreaks.map((streak, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-primary/20 pb-4 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{streak.description}</p>
                    <span className="text-xs text-gray-400">{streak.date}</span>
                  </div>
                  <span className="text-primary">+{streak.points} pts</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" className="btn-gradient-border" onClick={() => onOpenChange(false)}>
            Cerrar
          </Button>
          <Button variant="default" className="btn-magenta" onClick={handleLogin}>
            Ingresar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
})

