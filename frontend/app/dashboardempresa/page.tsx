"use client"

import { ContainerPrincipal } from "@/components/dashboardempresa/containerprincipal";
import { ContainerRight } from "@/components/dashboardempresa/containerRight";
import { SideBar } from "@/components/dashboardempresa/sidebar";



export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-[#0A082B] backdrop-blur-sm text-white">
      {/* Sidebar */}
      <aside className="col-span-2 rounded-lg flex flex-col gap-4">
        <SideBar/>
      </aside>

      {/* Main Content */}
      <main className="flex-1 rounded-lg flex flex-col gap-4">
        <ContainerPrincipal/>
      </main>

      {/* Right Panel */}
      <section className="col-span-3 bg-[#12112D] backdrop-blur-sm rounded-lg flex flex-col gap-4 items-center">
        <ContainerRight/>
      </section>
    </div>
  );
}


