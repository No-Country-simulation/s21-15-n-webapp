"use client"

import { toast } from "sonner"
import { DASHBOARD_TEXT } from "@/config/constants/dashboard-text"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"
import { DataTable } from "@/components/dashboard/admin/data-table/data-table"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"

// Type for questionnaire data
interface Questionnaire {
  id: number
  name: string
  lastUpdate: string
  questions: number
  role: string
}

export default function QuestionnairesPage() {
  const { questionnaires } = DASHBOARD_TEXT.admin

  // Define columns for the questionnaire table
  const questionnaireColumns = [
    {
      header: questionnaires.columns.name,
      accessorKey: "name" as keyof Questionnaire,
    },
    {
      header: questionnaires.columns.lastUpdate,
      accessorKey: "lastUpdate" as keyof Questionnaire,
    },
    {
      header: questionnaires.columns.questions,
      accessorKey: "questions" as keyof Questionnaire,
    },
    {
      header: questionnaires.columns.role,
      accessorKey: "role" as keyof Questionnaire,
    },
  ]

  // Event handlers for questionnaire table
  const handleQuestionnaireSearch = (query: string) => {
    console.log("Searching questionnaire:", query)
  }

  const handleAddQuestionnaire = () => {
    toast.success("Agregar nuevo cuestionario")
  }

  const handleEditQuestionnaire = (questionnaire: Questionnaire) => {
    toast.info(`Editando: ${questionnaire.name}`)
  }

  const handleDisableQuestionnaire = (questionnaire: Questionnaire) => {
    toast.info(`Deshabilitando: ${questionnaire.name}`)
  }

  const handleDeleteQuestionnaire = (questionnaire: Questionnaire) => {
    toast.error(`Eliminando: ${questionnaire.name}`)
  }

  return (
    <DashboardLayout>
      <div className="relative">
        {/* Stars Background */}
        <StarsBackground count={100} colors={["primary", "white", "secondary"]} className="z-1" />
        <div className="z-2 pointer-events-none">
          <MouseReflection />
        </div>
        <div className="space-y-6 p-6 z-10">
          <h1 className="text-2xl font-bold text-white mb-6">Gestión de Cuestionarios</h1>

          {/* Questionnaires Table */}
          <DataTable<Questionnaire>
            title={questionnaires.title}
            columns={questionnaireColumns}
            data={questionnaires.data}
            searchPlaceholder={questionnaires.searchPlaceholder}
            addButtonText={questionnaires.addButtonText}
            onSearch={handleQuestionnaireSearch}
            onAdd={handleAddQuestionnaire}
            onEdit={handleEditQuestionnaire}
            onDisable={handleDisableQuestionnaire}
            onDelete={handleDeleteQuestionnaire}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}
