"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileTabs } from "@/components/profile/profile-tabs"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"

export default function ProfilePage() {


  return (
    <DashboardLayout>
      <div className="relative">
        {/* Stars Background */}
        <StarsBackground count={100} colors={["primary", "white", "secondary"]} className="z-1" />
        <div className="z-2 pointer-events-none">
          <MouseReflection />
        </div>
        <div className="container mx-auto max-w-4xl py-8">
          <Card className="border-primary/20 bg-background/60 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-2xl">Perfil de Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileTabs />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
