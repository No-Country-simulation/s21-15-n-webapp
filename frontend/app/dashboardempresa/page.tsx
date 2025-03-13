"use client"

import { ContainerPrincipal } from "@/components/dashboardempresa/containerprincipal";
import { ContainerRight } from "@/components/dashboardempresa/containerRight";
import { SideBar } from "@/components/dashboardempresa/sidebar";

// Datos precargados
const profileData = {
  name: "Juan Pérez",
  role: "Diseñador Gráfico",
  stack: ["Figma", "Photoshop", "Illustrator", "Canva"],
  softSkills: ["Empatía", "Comunicación", "Creatividad", "Trabajo en equipo"],
  contact: {
    email: "juan.perez@gmail.com",
    linkedin: "linkedin.com/in/juanperez",
    phone: "+54 9 11 1234-5678",
  },
  avatar:
    "https://images.unsplash.com/photo-1635805737707-575885ab0820?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9tYnJlJTIwYXJhbmF8ZW58MHx8MHx8fDA%3D",
};

export default function DashboardPage() {
  return (
    <div className="bg-[#0A082B] min-h-screen text-white relative">

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-64 bg-[#0A082B] backdrop-blur-sm z-10">
        <SideBar />
      </aside>

      {/* Right Panel */}
      <section className="fixed top-0 right-0 h-screen w-80 bg-[#12112D] backdrop-blur-sm rounded-l-lg flex flex-col gap-4 items-center z-10">
        <ContainerRight profile={profileData}/>
      </section>

      {/* Main Content */}
      <main className="ml-64 mr-80 p-4 bg-[#0A082B] backdrop-blur-sm min-h-screen">
        <ContainerPrincipal />
      </main>

    </div>
  );
}

