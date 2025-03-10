"use client"

import { ContainerPrincipal } from "@/components/dashboardadmin/containerprincipal";
import { SideBar } from "@/components/dashboardempresa/sidebar";



export default function DashboardPage() {
  return (
    <div className="flex bg-[#0A082B] min-h-screen text-white">
      {/* Sidebar fijo */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0A082B] backdrop-blur-sm">
        <SideBar />
      </aside>

      {/* Contenido principal con margen a la izquierda */}
      <main className="flex-1 ml-64 p-4 bg-[#0A082B] backdrop-blur-sm">
        <ContainerPrincipal />
      </main>
    </div>
  );
}