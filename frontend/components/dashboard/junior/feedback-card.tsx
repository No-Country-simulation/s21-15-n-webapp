import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock } from "lucide-react"

// Textos locales para el componente
const FEEDBACK_TEXT = {
  feedbackDeMentores: "Feedback de mentores",
  seguir: "Seguir",
  hace: "Hace",
  dias: "días",
}

// Datos de feedback
const FEEDBACK_DATA = {
  mentor: "Eduardo Romero",
  role: "Diseñador UI",
  avatar: "/placeholder.svg?height=40&width=40",
  message:
    "Excelente progreso en el desarrollo del MVP. Las iteraciones basadas en feedback de usuarios muestran gran capacidad de adaptación.",
  daysAgo: 4,
}

export function FeedbackCard() {
  return (
    <Card className="border-primary/20 bg-[#0a0b1e] h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">{FEEDBACK_TEXT.feedbackDeMentores}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={FEEDBACK_DATA.avatar} alt={FEEDBACK_DATA.mentor} />
            <AvatarFallback className="bg-indigo-900/30 text-indigo-400">
              {FEEDBACK_DATA.mentor.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-white">{FEEDBACK_DATA.mentor}</h3>
                <p className="text-sm text-gray-400">{FEEDBACK_DATA.role}</p>
              </div>
              <Button variant="link" className="text-indigo-400 p-0 h-auto">
                {FEEDBACK_TEXT.seguir}
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-400">{FEEDBACK_DATA.message}</p>
            <div className="mt-4 flex items-center text-xs text-gray-400">
              <Clock className="mr-1 h-3 w-3" />
              {FEEDBACK_TEXT.hace} {FEEDBACK_DATA.daysAgo} {FEEDBACK_TEXT.dias}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

