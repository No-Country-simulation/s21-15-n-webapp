"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../components/ui/dialog"
import { Button } from "../../../../components/ui/button"
import { ScrollArea } from "../../../../components/ui/scroll-area"
import { memo } from "react"

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
    rank: string
    streaks: Streak[]
  } | null
}

export const UserProfileDialog = memo(function UserProfileDialog({ open, onOpenChange, user }: UserProfileDialogProps) {
  // Si no hay usuario, no renderizamos el contenido del diálogo
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white border-gray-800">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <img
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <DialogTitle className="text-xl font-bold text-white">{user.name}</DialogTitle>
              <span className="text-sm text-gray-400">{user.rank}</span>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">Rachas de Actividad</h4>
          <ScrollArea className="h-[200px] rounded-md border border-gray-800 p-4">
            <div className="space-y-4">
              {user.streaks.map((streak, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-800 pb-4 last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{streak.description}</p>
                    <span className="text-xs text-gray-400">{streak.date}</span>
                  </div>
                  <span className="text-emerald-400">+{streak.points} pts</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="mt-6 flex justify-between gap-4">
          <Button
            variant="outline"
            className="w-full border-gray-700 text-white hover:bg-gray-800"
            onClick={() => onOpenChange(false)}
          >
            Regresar
          </Button>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400">
            Ingresar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
})
