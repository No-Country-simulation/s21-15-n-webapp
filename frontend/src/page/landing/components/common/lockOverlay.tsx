import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../../../../components/ui/card"

import { LockIcon } from "lucide-react"
import { memo } from "react"
import { Button } from "../../../../components/ui/button"

interface LockOverlayProps {
  onUnlock: () => void
}

export const LockOverlay = memo(function LockOverlay({ onUnlock }: LockOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <Card className="w-full max-w-md bg-black/30 border-purple-900/20">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-900/20">
            <LockIcon className="h-6 w-6 text-purple-400" />
          </div>
          <CardTitle className="text-xl text-white">Sesión Bloqueada</CardTitle>
          <CardDescription className="text-gray-400">La sesión se bloqueó al cambiar de pestaña</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button variant="secondary" className="bg-purple-900 text-white hover:bg-purple-800" onClick={onUnlock}>
            Desbloquear
          </Button>
        </CardContent>
      </Card>
    </div>
  )
})
