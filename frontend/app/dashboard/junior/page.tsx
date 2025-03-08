"use client"

import { useEffect, useState } from "react"
import { useRandomStars } from "@/hooks/use-random-stars"
import { getStoredUser } from "@/lib/utils/auth"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"
import { ProfileCard } from "@/components/dashboard/junior/profile-card"
import { CoursesCard } from "@/components/dashboard/junior/courses-card"
import { RankingCard } from "@/components/dashboard/junior/ranking-card"
import { ExpCard } from "@/components/dashboard/junior/exp-card"
import type { User } from "@/lib/types"
import { CertificatesGallery } from "@/components/sections/certificates-gallery"
import { AdventureSection } from "@/components/dashboard/junior/adventure-section"
import { FeedbackCard } from "@/components/dashboard/junior/feedback-card"

export default function JuniorDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const stars = useRandomStars(50)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

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

