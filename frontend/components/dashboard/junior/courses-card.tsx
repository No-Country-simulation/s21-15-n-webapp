import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

// Textos locales para el componente
const COURSES_TEXT = {
  cursos: "Cursos",
  cursoAvanzadoDeFigma: "Curso avanzado de figma",
  completadoAl: "Completado al",
  seguir: "Seguir",
}

// Datos de cursos
const COURSES_DATA = [
  {
    id: 1,
    title: COURSES_TEXT.cursoAvanzadoDeFigma,
    progress: 55,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: COURSES_TEXT.cursoAvanzadoDeFigma,
    progress: 55,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export function CoursesCard() {
  return (
    <Card className="border-primary/20 bg-[#0a0b1e] h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">{COURSES_TEXT.cursos}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {COURSES_DATA.map((course) => (
          <div key={course.id} className="space-y-4">
            <div className="flex items-start gap-4">
              <Image
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                width={40}
                height={40}
                className="rounded-md"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-white mb-1">{course.title}</h3>
                <p className="text-xs text-gray-400 mb-2">
                  {COURSES_TEXT.completadoAl} {course.progress}%
                </p>
                <Progress
                  value={course.progress}
                  className="h-1.5 bg-indigo-900/30"
                  indicatorClassName="bg-indigo-500"
                />
              </div>
            </div>
            <Button variant="link" className="text-indigo-400 p-0 h-auto">
              {COURSES_TEXT.seguir}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

