import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

// Textos locales para el componente
const STREAK_TEXT = {
  rachaActual: "Racha actual",
  rachaMasLarga: "Racha mas larga",
  protectoresDeRacha: "Protectores de racha",
  de: "de",
  racha: "Racha",
  protegerRacha: "Proteger racha",
  dias: "días",
}

// Días de la semana
const WEEK_DAYS = ["L", "M", "M", "J", "V", "S", "D"]

export function StreakCard() {
  // En un caso real, estos datos vendrían de una API o del estado del usuario
  const currentStreak = 12
  const longestStreak = 22
  const streakShields = 2
  const maxShields = 3
  const activeWeekDays = 5 // Días activos en la semana actual (0-7)

  return (
    <div className="p-6 bg-[#0a0b1e]">
      {/* Estadísticas de racha */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-900/30 mb-2">
            <span className="text-green-400 text-lg">{currentStreak}</span>
          </div>
          <span className="text-xs text-gray-400">{STREAK_TEXT.rachaActual}</span>
          <span className="text-xs text-gray-400">{STREAK_TEXT.dias}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-900/30 mb-2">
            <span className="text-red-400 text-lg">{longestStreak}</span>
          </div>
          <span className="text-xs text-gray-400">{STREAK_TEXT.rachaMasLarga}</span>
          <span className="text-xs text-gray-400">{STREAK_TEXT.dias}</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-900/30 mb-2">
            <span className="text-indigo-400 text-lg">{streakShields}</span>
          </div>
          <span className="text-xs text-gray-400">{STREAK_TEXT.protectoresDeRacha}</span>
          <span className="text-xs text-gray-400">
            {streakShields} {STREAK_TEXT.de} {maxShields}
          </span>
        </div>
      </div>

      {/* Título de racha */}
      <h3 className="text-md font-medium text-white mb-4">{STREAK_TEXT.racha}</h3>

      {/* Calendario semanal */}
      <div className="flex justify-between mb-6">
        {WEEK_DAYS.map((day, index) => (
          <div key={day + index} className="flex flex-col items-center gap-2">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                index < activeWeekDays ? "bg-indigo-900/30 text-indigo-400" : "bg-gray-800/50 text-gray-500"
              }`}
            >
              {day}
            </div>
            <div className={`h-1 w-1 rounded-full ${index < activeWeekDays ? "bg-indigo-400" : "bg-gray-800"}`} />
          </div>
        ))}
      </div>

      {/* Botón de proteger racha */}
      <Button
        variant="outline"
        className="w-full border-indigo-900/30 bg-indigo-900/10 text-indigo-400 hover:bg-indigo-900/20"
      >
        <Shield className="mr-2 h-4 w-4" />
        {STREAK_TEXT.protegerRacha}
      </Button>
    </div>
  )
}
