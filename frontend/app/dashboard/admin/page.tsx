"use client"

import { DASHBOARD_TEXT } from "@/config/constants/dashboard-text"
import { CertificateGeneratorCard } from "@/components/dashboard/admin/certificate-generator-card"
import { StarsBackground } from "@/components/common/effects/stars-background"
import { MouseReflection } from "@/components/common/effects/mouse-reflection"
import { DashboardLayout } from "@/components/dashboard/layout/dashboard-layout"
import { MetricCard } from "@/components/dashboard/admin/metric/metric-card"
import { Overview } from "@/components/dashboard/admin/graphics/overview"
import { RoleDistributionChart } from "@/components/dashboard/admin/graphics/role-distribution-chart"

export default function AdminDashboard() {
   const { metrics } = DASHBOARD_TEXT.admin
  return (
    <DashboardLayout>
      <div className="relative">
        {/* Stars Background */}
        <StarsBackground count={100} colors={["primary", "white", "secondary"]} className="z-1" />
        <div className="z-2 pointer-events-none">
          <MouseReflection />
        </div>
        <div className="space-y-6 p-6  z-10">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 ">
            <MetricCard
              title={metrics.activeUsers.title}
              value={metrics.activeUsers.value}
              change={metrics.activeUsers.change}
              period={metrics.activeUsers.period}
              increasing={metrics.activeUsers.increasing}
              icon="users"
            />
            <MetricCard
              title={metrics.retentionRate.title}
              value={metrics.retentionRate.value}
              change={metrics.retentionRate.change}
              period={metrics.retentionRate.period}
              increasing={metrics.retentionRate.increasing}
              icon="chart"
            />
            <MetricCard
              title={metrics.activeQuizzes.title}
              value={metrics.activeQuizzes.value}
              change={metrics.activeQuizzes.change}
              period={metrics.activeQuizzes.period}
              increasing={metrics.activeQuizzes.increasing}
              icon="files"
            />
            <MetricCard
              title={metrics.lorem.title}
              value={metrics.lorem.value}
              change={metrics.lorem.change}
              period={metrics.lorem.period}
              increasing={metrics.lorem.increasing}
              icon="activity"
            />
          </div>
          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Overview />
            <RoleDistributionChart />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <CertificateGeneratorCard />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
