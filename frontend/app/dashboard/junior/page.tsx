"use client"

import { useEffect, useState } from "react"
import { getStoredUser } from "@/config/auth/auth"
import type { User } from "@/config/types"
import { AdventureSection } from "@/components/dashboard/junior/adventure-section"
import { CertificatesGallery } from "@/components/dashboard/junior/certificates-gallery"
import { CoursesCard } from "@/components/dashboard/junior/courses-card"
import { ExpCard } from "@/components/dashboard/junior/exp-card"
import { FeedbackCard } from "@/components/dashboard/junior/feedback-card"
import { RankingCard } from "@/components/dashboard/junior/ranking-card"
import { ProfileCard } from "@/components/dashboard/junior/profile-card"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"

export default function JuniorDashboard() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const currentUser = getStoredUser()
    if (currentUser) {
      setUser(currentUser)
    }
  }, [])

  if (!user) {
    return (
      <DashboardLayout>
        <div className="flex h-full items-center justify-center">
          <p className="text-lg text-white">Cargando información del usuario...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full">
        {/* Contenido con padding */}
        <div className="p-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Primera fila: Perfil y Racha */}
            <div className="col-span-12 lg:col-span-8">
              <ProfileCard user={user} />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <RankingCard />
            </div>

            {/* Segunda fila: Aventura espacial y Certificados */}
            <div className="col-span-12 lg:col-span-8">
              <AdventureSection />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <CertificatesGallery />
            </div>

            {/* Tercera fila: Cursos, Feedback y Exp */}
            <div className="col-span-12 lg:col-span-4">
              <CoursesCard />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <FeedbackCard />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <ExpCard />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
