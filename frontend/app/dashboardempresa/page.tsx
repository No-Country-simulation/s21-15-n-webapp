"use client"

import { ContainerPrincipal } from "@/components/dashboardempresa/containerprincipal";
import { ContainerRight } from "@/components/dashboardempresa/containerRight";
import { SideBar } from "@/components/dashboardempresa/sidebar";

export default function DashboardPage() {
  return (
    <div className="bg-[#0A082B] min-h-screen text-white relative">

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0A082B] backdrop-blur-sm z-10">
        <SideBar />
      </aside>

      {/* Right Panel */}
      <section className="fixed top-0 right-0 h-screen w-80 bg-[#12112D] backdrop-blur-sm rounded-l-lg flex flex-col gap-4 items-center z-10">
        <ContainerRight />
      </section>

      {/* Main Content */}
      <main className="ml-64 mr-80 p-4 bg-[#0A082B] backdrop-blur-sm min-h-screen">
        <ContainerPrincipal />
      </main>

    </div>
  );
}

